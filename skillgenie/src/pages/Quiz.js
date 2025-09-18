import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Clock, 
  CheckCircle, 
  X, 
  ArrowRight, 
  ArrowLeft,
  Trophy,
  Star,
  Target,
  Zap,
  Brain,
  RotateCcw,
  Home
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const quizData = {
    title: "Statistics & Probability - Chapter 3",
    description: "Test your understanding of descriptive statistics and probability distributions",
    totalQuestions: 10,
    timeLimit: 600, // 10 minutes
    passingScore: 70,
    points: 150
  };

  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of descriptive statistics?",
      options: [
        "To make predictions about future data",
        "To summarize and describe the main features of a dataset",
        "To test hypotheses about population parameters",
        "To establish causal relationships between variables"
      ],
      correct: 1,
      explanation: "Descriptive statistics are used to summarize and describe the main features of a dataset, providing simple summaries about the sample and measures. They help us understand what the data shows us."
    },
    {
      id: 2,
      question: "Which measure of central tendency is most affected by outliers?",
      options: [
        "Mean",
        "Median",
        "Mode",
        "All are equally affected"
      ],
      correct: 0,
      explanation: "The mean is most affected by outliers because it takes into account all values in the dataset. A single extreme value can significantly shift the mean, while the median and mode are more robust to outliers."
    },
    {
      id: 3,
      question: "In a normal distribution, approximately what percentage of data falls within one standard deviation of the mean?",
      options: [
        "50%",
        "68%",
        "95%",
        "99.7%"
      ],
      correct: 1,
      explanation: "In a normal distribution, approximately 68% of data falls within one standard deviation of the mean. This is part of the empirical rule (68-95-99.7 rule)."
    },
    {
      id: 4,
      question: "What type of probability distribution is characterized by having only two possible outcomes?",
      options: [
        "Normal distribution",
        "Poisson distribution",
        "Binomial distribution",
        "Exponential distribution"
      ],
      correct: 2,
      explanation: "A binomial distribution is characterized by having only two possible outcomes (success or failure) in each trial, with a fixed number of independent trials."
    },
    {
      id: 5,
      question: "If two events A and B are independent, what is P(A and B)?",
      options: [
        "P(A) + P(B)",
        "P(A) × P(B)",
        "P(A) - P(B)",
        "P(A) / P(B)"
      ],
      correct: 1,
      explanation: "For independent events, the probability of both events occurring is the product of their individual probabilities: P(A and B) = P(A) × P(B)."
    },
    {
      id: 6,
      question: "What does a correlation coefficient of -0.8 indicate?",
      options: [
        "Strong positive correlation",
        "Weak positive correlation",
        "Strong negative correlation",
        "No correlation"
      ],
      correct: 2,
      explanation: "A correlation coefficient of -0.8 indicates a strong negative correlation, meaning as one variable increases, the other tends to decrease significantly."
    },
    {
      id: 7,
      question: "In hypothesis testing, what is a Type I error?",
      options: [
        "Accepting a false null hypothesis",
        "Rejecting a true null hypothesis",
        "Using the wrong statistical test",
        "Having insufficient sample size"
      ],
      correct: 1,
      explanation: "A Type I error occurs when we reject a true null hypothesis. It's also known as a 'false positive' and its probability is denoted by α (alpha)."
    },
    {
      id: 8,
      question: "What is the interquartile range (IQR)?",
      options: [
        "The difference between the maximum and minimum values",
        "The difference between the 75th and 25th percentiles",
        "The difference between the mean and median",
        "The standard deviation squared"
      ],
      correct: 1,
      explanation: "The interquartile range (IQR) is the difference between the 75th percentile (Q3) and the 25th percentile (Q1). It represents the range of the middle 50% of the data."
    },
    {
      id: 9,
      question: "Which of the following best describes a p-value?",
      options: [
        "The probability that the null hypothesis is true",
        "The probability of observing the data given that the null hypothesis is true",
        "The probability that the alternative hypothesis is true",
        "The probability of making a Type II error"
      ],
      correct: 1,
      explanation: "A p-value is the probability of observing the data (or more extreme data) given that the null hypothesis is true. It helps us determine the strength of evidence against the null hypothesis."
    },
    {
      id: 10,
      question: "What is the purpose of the Central Limit Theorem?",
      options: [
        "To prove that all data follows a normal distribution",
        "To show that sample means approach a normal distribution as sample size increases",
        "To calculate the exact probability of any event",
        "To determine the optimal sample size for any study"
      ],
      correct: 1,
      explanation: "The Central Limit Theorem states that the distribution of sample means approaches a normal distribution as the sample size increases, regardless of the shape of the original population distribution."
    }
  ];

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResult) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleQuizComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, showResult]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      handleQuizComplete();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
      setShowExplanation(false);
    }
  };

  const handleQuizComplete = () => {
    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
      finalAnswers[currentQuestion] = selectedAnswer;
    }
    setAnswers(finalAnswers);
    setShowResult(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return { message: "Excellent! Outstanding performance!", icon: <Trophy className="w-8 h-8 text-yellow-500" /> };
    if (score >= 70) return { message: "Great job! You passed the quiz!", icon: <Award className="w-8 h-8 text-blue-500" /> };
    if (score >= 50) return { message: "Good effort! Review the topics and try again.", icon: <Target className="w-8 h-8 text-yellow-500" /> };
    return { message: "Keep studying! You'll get it next time.", icon: <Brain className="w-8 h-8 text-red-500" /> };
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-dark-primary flex">
        <Sidebar />
        
        <div className="flex-1 ml-64 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="light-card p-8 max-w-2xl mx-auto text-center"
          >
            <div className="gradient-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{quizData.title}</h1>
            <p className="text-gray-600 mb-8">{quizData.description}</p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-blue mb-1">{quizData.totalQuestions}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-purple mb-1">{formatTime(quizData.timeLimit)}</div>
                <div className="text-sm text-gray-600">Time Limit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-pink mb-1">{quizData.points}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-8">
              <h3 className="font-semibold text-blue-800 mb-2">Quiz Instructions:</h3>
              <ul className="text-sm text-blue-700 text-left space-y-1">
                <li>• You have {formatTime(quizData.timeLimit)} to complete all questions</li>
                <li>• You need {quizData.passingScore}% to pass this quiz</li>
                <li>• You can navigate between questions using the Previous/Next buttons</li>
                <li>• Your progress is automatically saved</li>
              </ul>
            </div>
            
            <button
              onClick={() => setQuizStarted(true)}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-3 mx-auto"
            >
              <Zap className="w-6 h-6" />
              Start Quiz
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const score = calculateScore();
    const scoreData = getScoreMessage(score);
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length;
    const earnedPoints = Math.round((score / 100) * quizData.points);

    return (
      <div className="min-h-screen bg-dark-primary flex">
        <Sidebar />
        
        <div className="flex-1 ml-64 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Results Header */}
            <div className="light-card p-8 text-center mb-6">
              <div className="mb-6">
                {scoreData.icon}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
              <p className="text-gray-600 mb-6">{scoreData.message}</p>
              
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-1 ${getScoreColor(score)}`}>{score}%</div>
                  <div className="text-sm text-gray-600">Final Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{correctAnswers}</div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-blue mb-1">{earnedPoints}</div>
                  <div className="text-sm text-gray-600">Points Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{formatTime(quizData.timeLimit - timeLeft)}</div>
                  <div className="text-sm text-gray-600">Time Taken</div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedAnswer(null);
                    setAnswers([]);
                    setShowResult(false);
                    setTimeLeft(quizData.timeLimit);
                    setQuizStarted(false);
                  }}
                  className="btn-secondary flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Quiz
                </button>
                <button
                  onClick={() => navigate('/roadmap')}
                  className="btn-primary flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  Continue Learning
                </button>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="light-card p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Question Review</h2>
              <div className="space-y-6">
                {questions.map((question, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === question.correct;
                  
                  return (
                    <div key={question.id} className={`p-4 rounded-lg border-l-4 ${
                      isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-800">
                          {index + 1}. {question.question}
                        </h3>
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 flex-shrink-0 ml-2" />
                        )}
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded text-sm ${
                              optionIndex === question.correct
                                ? 'bg-green-100 text-green-800 font-medium'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'bg-red-100 text-red-800'
                                : 'text-gray-700'
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-sm text-gray-600 bg-white p-3 rounded">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-dark-secondary/50 border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">{quizData.title}</h1>
              <p className="text-gray-400">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-neon-blue">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Progress</div>
                <div className="text-lg font-semibold">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-gray-600 rounded-full h-2">
            <div 
              className="bg-neon-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </header>

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="light-card p-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                  {questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-4 mb-8">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? 'border-neon-blue bg-blue-50 text-blue-800'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index
                            ? 'border-neon-blue bg-neon-blue text-white'
                            : 'border-gray-300'
                        }`}>
                          {selectedAnswer === index && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-blue-50 p-4 rounded-lg mb-6"
                  >
                    <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                    <p className="text-blue-700">{questions[currentQuestion].explanation}</p>
                  </motion.div>
                )}
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-4">
                    {selectedAnswer !== null && (
                      <button
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="text-neon-blue hover:text-blue-600 font-medium"
                      >
                        {showExplanation ? 'Hide' : 'Show'} Explanation
                      </button>
                    )}
                    
                    <button
                      onClick={currentQuestion === questions.length - 1 ? handleQuizComplete : handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
