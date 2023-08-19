import { Router } from "express";
import { useDB } from "@/hooks";
import { Joke } from "@/hooks/useDB/entity/entityJoke";

export const joke = Router();

useDB((db) => {
  joke.get("", async (req, res) => {
    const { num = "1" } = req.query as Record<string, string>;
    const url = new URL("https://autumnfish.cn/api/joke/list");
    url.searchParams.set("num", num);
    const _res = await fetch(url, { method: "get" });
    if (!_res.ok) throw new Error("upstream error");
    const { code, data: rows, mes } = await _res.json();
    if (code > 299 || code < 200) throw new Error(mes);

    const jokes = (rows as string[]).map((row) => {
      const joke = new Joke();
      joke.joke_text = row;
      return joke;
    });
    await db.manager.save(jokes);

    return res.json({ isOk: true, rows });
  });
});
