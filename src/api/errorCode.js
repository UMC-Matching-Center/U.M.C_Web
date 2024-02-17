export default function errorCode(err) {
  const errorCodes = new Set([
    // COMMON
    "COMMON500",
    "COMMON400",
    "COMMON401",
    "COMMON403",

    // Member
    "MEMBER4001",
    "MEMBER4002",
    "MEMBER4003",
    "MEMBER4004",
    "MEMBER4005",

    // My Project
    "MYPROJECT4001",
    "MYPROJECT4002",

    // Authorization
    "EMAIL4002",
    "EMAIL4003",
    "EMAIL4004",

    // JWT
    "JWT4001",
    "JWT4002",
    "JWT4003",
    "JWT4004",
    "JWT4005",

    // Alarm
    "ALARM4001",
    "ALARM4002",

    // Project
    "PROJECT4001",
    "PROJECT4002",
    "PROJECT4003",

    // Schedule
    "SCHEDULE4001",
    "SCHEDULE4002",
    "SCHEDULE4003",

    // Notice
    "NOTICE4001",
    "NOTICE4002",

    // Evaluation
    "EVALUATION4001",
    "EVALUATION4002",
    "EVALUATION4003",

    // Branch
    "BRANCH4001",

    // University
    "UNIVERSITY4001",

    // Recruitment
    "RECRUITMENT4001",

    // Q&A
    "QUESTION4001",
    "ANSWER4002",

    // File
    "IMAGE4001",

    // Apply
    "APPLY4001",
    "APPLY4002",
  ]);

  if (err.response && errorCodes.has(err.response.data.code))
    return err.response.data.message;
  else
    return `HTTP Code ${err.response?.status}: 알 수 없는 오류가 발생했습니다.`;
}
