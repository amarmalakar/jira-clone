import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createTaskSchema } from "../schemas";
import { getMember } from "@/features/members/utils";
import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, TASKS_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { z } from "zod";
import { TaskStatus } from "../types";
import { createAdminClient } from "@/lib/appwrite";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator("query", z.object({
      workspaceId: z.string(),
      projectId: z.string().nullish(),
      asigneeId: z.string().nullish(),
      status: z.nativeEnum(TaskStatus).nullish(),
      search: z.string().nullish(),
      dueDate: z.string().nullish()
    })),
    async (c) => {
      const { users } = await createAdminClient()
      const databases = c.get("databases");
      const user = c.get("user");

      const {
        workspaceId,
        projectId,
        asigneeId,
        status,
        search,
        dueDate
      } = c.req.valid("query");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id
      })

      if (!member) {
        return c.json({ error: "Unautorized" }, 401)
      }

      const query = [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
        ...(projectId ? [Query.equal("projectId", projectId)] : []),
        ...(asigneeId ? [Query.equal("asigneeId", asigneeId)] : []),
        ...(status ? [Query.equal("status", status)] : []),
        ...(search ? [Query.search("name", search)] : []),
        ...(dueDate ? [Query.equal("dueDate", dueDate)] : []),
        Query.orderAsc("position")
      ]

      const tasks = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        query
      )

      const projectIds = tasks.documents.map(task => task.projectId)
      const asigneeIds = tasks.documents.map(task => task.asigneeId)

      const projects = await databases.listDocuments(
        DATABASE_ID,
        PROJECTS_ID,
        projectIds.length > 0 ? [Query.equal("$id", projectIds)] : []
      )

      const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        asigneeIds.length > 0 ? [Query.equal("$id", asigneeIds)] : []
      )

      const asignees = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId)
          return {
            ...member,
            name: user.name,
            email: user.email
          }
        })
      )

      const populatedTasks = tasks.documents.map(task => {
        const project = projects.documents.find(project => project.$id === task.projectId)
        const asignee = asignees.find(asignee => asignee.$id === task.asigneeId)

        return {
          ...task,
          project,
          asignee
        }
      })

      return c.json({ data: {...tasks, documents: populatedTasks} })
    }
  )
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", createTaskSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const {
        name,
        status,
        workspaceId,
        projectId,
        dueDate,
        asigneeId
      } = c.req.valid("json");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id
      })

      if (!member) {
        return c.json({ error: "Unautorized" }, 401)
      }

      const highestPositionTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal("status", status),
          Query.equal("workspaceId", workspaceId),
          Query.orderAsc("position"),
          Query.limit(1)
        ]
      )

      const newPosition = highestPositionTask.documents.length > 0 ? highestPositionTask.documents[0].position + 1000 : 1000;

      const task = await databases.createDocument(
        DATABASE_ID,
        TASKS_ID,
        ID.unique(),
        {
          name,
          status,
          workspaceId,
          projectId,
          dueDate,
          asigneeId,
          position: newPosition
        }
      )

      return c.json({ data: task })
    }
  )

export default app;