const express = require('express');
const { body, validationResult } = require('express-validator');
const geminiService = require('../services/geminiService');
const router = express.Router();

// Mock middleware for authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }
  req.userId = 'mock-user-id';
  next();
};

// @route   GET /api/quizzes/chapter/:chapterId
// @desc    Get quiz for specific chapter
// @access  Private
router.get('/chapter/:chapterId', authenticateToken, async (req, res) => {
  try {
    const { chapterId } = req.params;
    const { topic = 'Data Science', difficulty = 'medium' } = req.query;

    // Generate quiz with Gemini AI
    const quizData = await geminiService.generateQuiz(topic, difficulty, 10);

    const quiz = {
      id: `quiz_${chapterId}`,
      chapterId: parseInt(chapterId),
      title: `${topic} Quiz - Chapter ${chapterId}`,
      description: `Test your understanding of ${topic}`,
      totalQuestions: quizData.questions?.length || 10,
      timeLimit: 600, // 10 minutes in seconds
      passingScore: 70,
      points: 150,
      difficulty: quizData.difficulty,
      questions: quizData.questions || [
        {
          id: 1,
          question: 'What is the primary purpose of descriptive statistics?',
          type: 'multiple_choice',
          options: [
            'To make predictions about future data',
            'To summarize and describe the main features of a dataset',
            'To test hypotheses about population parameters',
            'To establish causal relationships between variables'
          ],
          correct: 1,
          points: 15,
          explanation: 'Descriptive statistics are used to summarize and describe the main features of a dataset, providing simple summaries about the sample and measures.'
        },
        {
          id: 2,
          question: 'Which measure of central tendency is most affected by outliers?',
          type: 'multiple_choice',
          options: ['Mean', 'Median', 'Mode', 'All are equally affected'],
          correct: 0,
          points: 15,
          explanation: 'The mean is most affected by outliers because it takes into account all values in the dataset.'
        }
      ],
      attempts: [
        {
          id: 'attempt_1',
          score: 85,
          completedAt: new Date(Date.now() - 86400000),
          timeSpent: 480,
          passed: true
        }
      ],
      bestScore: 85,
      averageScore: 85,
      totalAttempts: 1
    };

    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/quizzes/:quizId/submit
// @desc    Submit quiz answers
// @access  Private
router.post('/:quizId/submit', [
  authenticateToken,
  body('answers').isArray(),
  body('timeSpent').isInt({ min: 0 })
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { quizId } = req.params;
    const { answers, timeSpent } = req.body;

    // Mock quiz evaluation
    const correctAnswers = [1, 0, 1, 2, 1, 2, 1, 1, 1, 1]; // Correct answer indices
    let correctCount = 0;

    const detailedResults = answers.map((answer, index) => {
      const isCorrect = answer === correctAnswers[index];
      if (isCorrect) correctCount++;

      return {
        questionId: index + 1,
        userAnswer: answer,
        correctAnswer: correctAnswers[index],
        isCorrect,
        points: isCorrect ? 15 : 0
      };
    });

    const score = Math.round((correctCount / correctAnswers.length) * 100);
    const totalPoints = correctCount * 15;
    const passed = score >= 70;

    const result = {
      attemptId: `attempt_${Date.now()}`,
      quizId,
      userId: req.userId,
      score,
      totalPoints,
      correctAnswers: correctCount,
      totalQuestions: correctAnswers.length,
      timeSpent,
      passed,
      completedAt: new Date(),
      detailedResults,
      feedback: {
        message: passed 
          ? score >= 90 ? 'Excellent work! Outstanding performance!' 
          : 'Great job! You passed the quiz!'
          : 'Good effort! Review the topics and try again.',
        strengths: correctCount > 7 ? ['Strong understanding of core concepts'] : [],
        improvements: correctCount < 7 ? ['Review statistical concepts', 'Practice more problems'] : []
      }
    };

    res.json({
      success: true,
      message: 'Quiz submitted successfully',
      data: result
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/quizzes/history
// @desc    Get user's quiz history
// @access  Private
router.get('/history', authenticateToken, (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const quizHistory = {
      attempts: [
        {
          id: 'attempt_1',
          quizId: 'quiz_3',
          title: 'Statistics & Probability Quiz',
          chapterTitle: 'Statistics & Probability',
          score: 85,
          totalPoints: 150,
          passed: true,
          timeSpent: 480,
          completedAt: new Date(Date.now() - 86400000)
        },
        {
          id: 'attempt_2',
          quizId: 'quiz_2',
          title: 'Data Analysis Quiz',
          chapterTitle: 'Data Analysis with Pandas',
          score: 92,
          totalPoints: 150,
          passed: true,
          timeSpent: 420,
          completedAt: new Date(Date.now() - 172800000)
        },
        {
          id: 'attempt_3',
          quizId: 'quiz_1',
          title: 'Python Fundamentals Quiz',
          chapterTitle: 'Python Fundamentals',
          score: 78,
          totalPoints: 150,
          passed: true,
          timeSpent: 540,
          completedAt: new Date(Date.now() - 259200000)
        }
      ],
      pagination: {
        currentPage: parseInt(page),
        totalPages: 1,
        totalAttempts: 3,
        limit: parseInt(limit)
      },
      stats: {
        averageScore: 85,
        totalQuizzesTaken: 3,
        totalQuizzesPassed: 3,
        totalPointsEarned: 450,
        bestScore: 92,
        totalTimeSpent: 1440 // in seconds
      }
    };

    res.json({
      success: true,
      data: quizHistory
    });
  } catch (error) {
    console.error('Get quiz history error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/quizzes/attempt/:attemptId
// @desc    Get detailed quiz attempt results
// @access  Private
router.get('/attempt/:attemptId', authenticateToken, (req, res) => {
  try {
    const { attemptId } = req.params;

    const attemptDetails = {
      id: attemptId,
      quizId: 'quiz_3',
      title: 'Statistics & Probability Quiz',
      score: 85,
      totalPoints: 150,
      correctAnswers: 8,
      totalQuestions: 10,
      timeSpent: 480,
      passed: true,
      completedAt: new Date(Date.now() - 86400000),
      questions: [
        {
          id: 1,
          question: 'What is the primary purpose of descriptive statistics?',
          userAnswer: 1,
          correctAnswer: 1,
          isCorrect: true,
          points: 15,
          explanation: 'Descriptive statistics are used to summarize and describe the main features of a dataset.'
        },
        {
          id: 2,
          question: 'Which measure of central tendency is most affected by outliers?',
          userAnswer: 0,
          correctAnswer: 0,
          isCorrect: true,
          points: 15,
          explanation: 'The mean is most affected by outliers because it considers all values.'
        }
      ],
      feedback: {
        message: 'Great job! You passed the quiz!',
        strengths: ['Strong understanding of descriptive statistics', 'Good grasp of central tendency'],
        improvements: ['Review probability distributions', 'Practice hypothesis testing']
      }
    };

    res.json({
      success: true,
      data: attemptDetails
    });
  } catch (error) {
    console.error('Get attempt details error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/quizzes/generate
// @desc    Generate AI quiz for custom topic
// @access  Private
router.post('/generate', [
  authenticateToken,
  body('topic').trim().isLength({ min: 2, max: 100 }),
  body('difficulty').isIn(['easy', 'medium', 'hard']),
  body('questionCount').isInt({ min: 5, max: 20 })
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { topic, difficulty, questionCount } = req.body;

    // Mock AI-generated quiz
    const generatedQuiz = {
      id: `generated_${Date.now()}`,
      title: `${topic} Quiz`,
      description: `AI-generated quiz on ${topic}`,
      difficulty,
      totalQuestions: questionCount,
      timeLimit: questionCount * 60, // 1 minute per question
      points: questionCount * 15,
      generatedAt: new Date(),
      questions: Array.from({ length: questionCount }, (_, i) => ({
        id: i + 1,
        question: `Sample question ${i + 1} about ${topic}?`,
        type: 'multiple_choice',
        options: [
          'Option A',
          'Option B',
          'Option C',
          'Option D'
        ],
        correct: Math.floor(Math.random() * 4),
        points: 15,
        explanation: `This is the explanation for question ${i + 1} about ${topic}.`
      }))
    };

    res.json({
      success: true,
      message: 'Quiz generated successfully',
      data: generatedQuiz
    });
  } catch (error) {
    console.error('Generate quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/quizzes/leaderboard
// @desc    Get quiz leaderboard
// @access  Private
router.get('/leaderboard', authenticateToken, (req, res) => {
  try {
    const { period = 'all_time', limit = 10 } = req.query;

    const leaderboard = {
      period,
      rankings: [
        {
          rank: 1,
          userId: 'user_1',
          name: 'Alice Johnson',
          avatar: 'https://via.placeholder.com/40x40/3B82F6/white?text=AJ',
          totalPoints: 3250,
          quizzesTaken: 15,
          averageScore: 91,
          badges: ['Quiz Master', 'Perfect Score']
        },
        {
          rank: 2,
          userId: 'user_2',
          name: 'Bob Smith',
          avatar: 'https://via.placeholder.com/40x40/8B5CF6/white?text=BS',
          totalPoints: 2890,
          quizzesTaken: 12,
          averageScore: 87,
          badges: ['Consistent Learner']
        },
        {
          rank: 3,
          userId: req.userId,
          name: 'You',
          avatar: 'https://via.placeholder.com/40x40/EC4899/white?text=YU',
          totalPoints: 2450,
          quizzesTaken: 10,
          averageScore: 85,
          badges: ['Rising Star'],
          isCurrentUser: true
        }
      ],
      userRank: 3,
      totalParticipants: 150
    };

    res.json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
