import { Router } from "express";
import { useDB } from "@/hooks";
import { User } from "@/hooks/useDB/entity";

export const login = Router();

useDB((db) => {
  // 登录接口
  login.post("/login", async (req, res) => {
    const { password = "", username = "" } = req.body;

    const qRes = await db.manager.findOneByOrFail(User, {
      user_name: username,
    });
    const isPassed = qRes.user_pwd === password;
    if (!isPassed) throw new Error("用户名或密码错误");
    return res.json({
      isOk: true,
      // token: useSign({ username, password }),
      username,
      invalidTime: Date.now() + 1000 * 3600 * 24 * 7,
    });
  });
  // 注册接口
  login.post("/register", async (req, res) => {
    const { password = "", username = "" } = req.body as Record<string, string>;
    const qRes = await db.manager.findOneBy(User, { user_name: username });
    if (qRes) throw new Error("用户已存在");
    const user = new User();
    user.user_name = username;
    user.user_pwd = password;
    const rows = await db.manager.save(user);
    return res.json({ isOk: true, rows, message: "注册成功" });
  });
  // 查询所有用户
  login.get("/query", async (req, res) => {
    const rows = await db.manager.find(User);
    return res.json({ isOk: true, rows });
  });
  // 删除某个用户
  login.delete("/del/:id", async (req, res) => {
    const { id = "" } = req.params;
    const rRes = await db.manager.findOneByOrFail(User, { user_id: id });
    const rows = await db.manager.remove(User, rRes);
    return res.json({ isOk: true, rows });
  });
});
