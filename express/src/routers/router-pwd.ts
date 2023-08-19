import { Router } from "express";
import { Like } from "typeorm";
import { useDB } from "@/hooks";
import { Pwd } from "@/hooks/useDB/entity";

export const pwd = Router();

useDB((db) => {
  pwd.get("/query", async (req, res) => {
    const {
      pwd_site = "",
      pwd_username = "",
      page_index = 1,
      page_size = 20,
    } = req.query as Record<string, string>;
    const query = {
      pwd_site: Like(`%${pwd_site}%`),
      pwd_username: Like(`%${pwd_username}%`),
    };
    const pagi = {
      index: +page_index || 1,
      size: +page_size || 20,
    };

    const [rows, total] = await db.manager.findAndCount(Pwd, {
      where: [query],
      skip: (pagi.index - 1) * pagi.size,
      take: pagi.size,
      order: { pwd_site: "asc", pwd_username: "asc" },
    });
    return res.json({ isOk: true, rows, total });
  });
  pwd.post("/save", async (req, res) => {
    const { pwd_site, pwd_username, pwd_pwd } = req.body;
    const pwd = new Pwd();
    pwd.pwd_site = pwd_site;
    pwd.pwd_username = pwd_username;
    pwd.pwd_pwd = pwd_pwd;
    const rows = await db.manager.save(Pwd, pwd);
    return res.json({ isOk: true, rows });
  });
  pwd.get("/query/:id", async (req, res) => {
    const { id } = req.params;
    const data = await db.manager.findOneByOrFail(Pwd, { pwd_id: id });
    return res.json({ isOk: true, data });
  });
  pwd.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    const rRes = await db.manager.findOneByOrFail(Pwd, { pwd_id: id });
    const data = await db.manager.remove(Pwd, rRes);
    return res.json({ isOk: true, data });
  });
});
