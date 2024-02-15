export default function errorCode(err) {
  switch (err.response.data?.code) {
    // COMMON
    case "COMMON500":
      return "서버 에러, 관리자에게 문의 바랍니다.";
    case "COMMON400":
      return "잘못된 요청입니다.";
    case "COMMON401":
      return "인증이 필요합니다.";
    case "COMMON403":
      return "금지된 요청입니다.";

    // Member
    case "MEMBER4001":
      return "존재하지 않는 사용자입니다.";
    case "MEMBER4002":
      return "잘못된 비밀번호 입니다.";
    case "MEMBER4003":
      return "닉네임은 필수 입니다.";
    case "MEMBER4004":
      return "이미 등록된 사용자 입니다.";
    case "MEMBER4005":
      return "프로필사진 업로드에 실패했습니다.";

    // My Project
    case "MYPROJECT4001":
      return "해당 프로젝트의 지원자가 없습니다.";
    case "MYPROJECT4002":
      return "더 이상 지원자를 받을 수 없습니다.";

    // Authorization
    case "EMAIL4002":
      return "잘못된 인증 코드 입니다.";
    case "EMAIL4003":
      return "코드 생성에 실패했습니다.";
    case "EMAIL4004":
      return "이메일 전송에 실패했습니다.";

    // JWT
    case "JWT4001":
      return "권한이 존재하지 않습니다.";
    case "JWT4002":
      return "자격증명이 유효하지 않습니다.";
    case "JWT4003":
      return "만료된 jwt 토큰입니다.";
    case "JWT4004":
      return "잘못된 jwt 서명입니다.";
    case "JWT4005":
      return "잘못된 refresh 토큰입니다.";

    // Alarm
    case "ALARM4001":
      return "삭제할 알림이 존재하지 않습니다.";
    case "ALARM4002":
      return "알림이 존재하지 않습니다.";

    // Project
    case "PROJECT4001":
      return "프로젝트가 존재하지 않습니다.";
    case "PROJECT4002":
      return "완료된 프로젝트가 아닙니다.";
    case "PROJECT4003":
      return "현재 매칭 중인 프로젝트가 아닙니다.";

    // Matching
    case "MATCHING4001":
      return "매칭이 존재하지 않습니다.";
    case "MATCHING4002":
      return "해당 매칭 일정에 대한 권한이 없습니다.";
    case "MATCHING4003":
      return "유효하지 않은 색상입니다.";

    // Notice
    case "NOTICE4001":
      return "공지사항이 없습니다.";
    case "NOTICE4002":
      return "이미지 업로드에 실패했습니다.";

    // Evaluation
    case "EVALUATION4001":
      return "평가가 존재하지 않습니다.";
    case "EVALUATION4002":
      return "해당 프로젝트의 멤버가 아닙니다.";
    case "EVALUATION4003":
      return "이미 평가가 완료된 멤버입니다.";

    // Branch
    case "BRANCH4001":
      return "지부가 존재하지 않습니다.";

    // University
    case "UNIVERSITY4001":
      return "학교가 존재하지 않습니다.";

    // Apply
    case "APPLY4001":
      return "지원 정보가 없습니다.";

    // Q&A
    case "QUESTION4001":
      return "질문이 존재하지 않습니다.";
    case "ANSWER4002":
      return "질문에 대한 답변 권한이 없습니다.";

    // File
    case "FILE4001":
      return "파일이 존재하지 않습니다.";

    default:
      return "알 수 없는 오류가 발생했습니다.";
  }
}
