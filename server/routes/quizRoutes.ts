import express from "express";
import pool from "../config/db";

const router = express.Router();

// 📌 GET All Quizzes
router.get("/", async (req, res) => {
  try {
    const [quizzes] = await pool.query("SELECT * FROM quizzes");
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes" });
  }
});

// 📌 GET Single Quiz by ID (with questions & options)
router.get("/:id", async (req, res) => {
  try {
    const [quiz] = await pool.query("SELECT * FROM quizzes WHERE id = ?", [req.params.id]);
    if (!quiz.length) return res.status(404).json({ message: "Quiz not found" });

    const [questions] = await pool.query("SELECT * FROM questions WHERE quizId = ?", [req.params.id]);

    for (let q of questions) {
      const [options] = await pool.query("SELECT * FROM options WHERE questionId = ?", [q.id]);
      q.options = options.map((opt: any) => opt.optionText);
    }

    res.json({ ...quiz[0], questions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz" });
  }
});

// 📌 POST Create Quiz
router.post("/", async (req, res) => {
  const { title, ownerId, questions } = req.body;

  try {
    const [result] = await pool.query("INSERT INTO quizzes (title, ownerId) VALUES (?, ?)", [title, ownerId]);
    const quizId = (result as any).insertId;

    for (let question of questions) {
      const [qResult] = await pool.query(
        "INSERT INTO questions (quizId, questionText, correctAnswer) VALUES (?, ?, ?)",
        [quizId, question.text, question.correctAnswer]
      );
      const questionId = (qResult as any).insertId;

      for (let option of question.options) {
        await pool.query("INSERT INTO options (questionId, optionText) VALUES (?, ?)", [questionId, option]);
      }
    }

    res.json({ message: "Quiz created", quizId });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz" });
  }
});

// 📌 DELETE Quiz
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM quizzes WHERE id = ?", [req.params.id]);
    res.json({ message: "Quiz deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz" });
  }
});

export default router;
