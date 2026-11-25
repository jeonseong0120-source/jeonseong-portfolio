"use client";

import { useMemo, useState } from "react";
import styles from "./dondok.module.css";

type JoinScenario = "available" | "full" | "closed";
type AiScenario = "valid" | "markdown" | "missingDay" | "invalidPeriod";

const joinCases: Record<JoinScenario, { label: string; members: string; result: string; code: string; tone: "success" | "error" }> = {
  available: { label: "모집 중 · 한 자리 남음", members: "5 / 6명", result: "신청이 접수되었습니다. 방장 승인 대기 상태예요.", code: "PENDING", tone: "success" },
  full: { label: "정원 마감", members: "6 / 6명", result: "크루 정원이 가득 찼습니다.", code: "CAPACITY_FULL", tone: "error" },
  closed: { label: "모집 종료", members: "5 / 6명", result: "모집 기간이 종료된 크루입니다.", code: "CREW_NOT_RECRUITING", tone: "error" },
};

const aiCases: Record<AiScenario, { label: string; raw: string; result: string; detail: string; tone: "success" | "error" }> = {
  valid: { label: "정상 JSON", raw: `{\n  "title": "아침 독서",\n  "description": "매일 독서 인증",\n  "frequency_type": "DAILY",\n  "mission_schedule_days": [],\n  "daily_settlement_type": "A",\n  "deposit_amount": 10000,\n  "duration_days": 30\n}`, result: "검증 통과", detail: "필수 필드와 DAILY 규칙을 통과한 뒤 수정 가능한 초안으로 전달합니다.", tone: "success" },
  markdown: { label: "코드 블록 포함", raw: `\`\`\`json\n{\n  "title": "아침 독서",\n  "description": "매일 독서 인증",\n  "frequency_type": "DAILY",\n  "mission_schedule_days": [],\n  "daily_settlement_type": "A",\n  "deposit_amount": 10000,\n  "duration_days": 30\n}\n\`\`\``, result: "코드 블록 제거 후 검증 통과", detail: "응답 앞뒤의 Markdown 코드 블록을 제거한 뒤 같은 필드 규칙을 검사합니다.", tone: "success" },
  missingDay: { label: "요일 누락", raw: `{\n  "title": "독서",\n  "description": "매일 독서",\n  "frequency_type": "SPECIFIC_DAYS",\n  "mission_schedule_days": [],\n  "daily_settlement_type": "A",\n  "deposit_amount": 10000,\n  "duration_days": 30\n}`, result: "유효하지 않은 AI 응답", detail: "SPECIFIC_DAYS는 MONDAY처럼 전체 이름의 요일을 하나 이상 가져야 합니다.", tone: "error" },
  invalidPeriod: { label: "기간 범위 초과", raw: `{\n  "title": "독서",\n  "description": "매일 독서",\n  "frequency_type": "DAILY",\n  "mission_schedule_days": [],\n  "daily_settlement_type": "A",\n  "deposit_amount": 10000,\n  "duration_days": 400\n}`, result: "유효하지 않은 AI 응답", detail: "duration_days는 1일 이상 365일 이하여야 합니다.", tone: "error" },
};

export default function DondokDemo() {
  const [scenario, setScenario] = useState<JoinScenario>("available");
  const [joinClicks, setJoinClicks] = useState(0);
  const [concurrencyRun, setConcurrencyRun] = useState(false);
  const [aiScenario, setAiScenario] = useState<AiScenario>("valid");
  const selectedJoin = joinCases[scenario];
  const selectedAi = aiCases[aiScenario];
  const joinResult = useMemo(() => {
    if (joinClicks === 0) return null;
    if (scenario === "available" && joinClicks > 1) return { result: "이미 이 크루에 신청한 상태입니다.", code: "ALREADY_PARTICIPATING", tone: "error" as const };
    return selectedJoin;
  }, [joinClicks, scenario, selectedJoin]);

  const selectScenario = (next: JoinScenario) => { setScenario(next); setJoinClicks(0); };

  return (
    <section className={styles.demoSection} id="demo">
      <div className={styles.demoHeading}>
        <p>규칙 체험</p>
        <h2>화면이 아니라,<br />처리 기준을 보여줍니다.</h2>
        <span>실제 서비스 규칙을 브라우저에서 재현한 포트폴리오용 체험입니다. 실제 서버나 결제 요청은 발생하지 않습니다.</span>
      </div>

      <div className={styles.ruleDemoGrid}>
        <article className={styles.ruleCard}>
          <div className={styles.ruleCardHead}><span>01 · 가입 신청</span><a href="https://github.com/jeonseong0120-source/dondok-be/blob/main/src/main/java/com/oit/dondok/domain/crew/service/CrewService.java" target="_blank" rel="noreferrer">원본 코드 보기</a></div>
          <h3>상태에 따라<br />다른 결과를 반환합니다.</h3>
          <div className={styles.ruleOptions} role="group" aria-label="가입 신청 상황 선택">
            {(Object.keys(joinCases) as JoinScenario[]).map((key) => <button type="button" key={key} className={scenario === key ? styles.selectedOption : ""} onClick={() => selectScenario(key)}>{joinCases[key].label}</button>)}
          </div>
          <div className={styles.joinSimulator}><div><span>코딩 실력 향상</span><strong>{selectedJoin.members}</strong></div><button type="button" onClick={() => setJoinClicks((count) => count + 1)}>가입 신청</button></div>
          <div className={`${styles.ruleResult} ${joinResult?.tone === "error" ? styles.errorResult : joinResult ? styles.successResult : styles.waitingResult}`} aria-live="polite">{joinResult ? <><code>{joinResult.code}</code><p>{joinResult.result}</p></> : <p>상황을 고른 뒤 가입 신청 버튼을 눌러 보세요.</p>}</div>
        </article>

        <article className={styles.ruleCard}>
          <div className={styles.ruleCardHead}><span>02 · 동시 가입</span><a href="https://github.com/jeonseong0120-source/dondok-be/blob/main/src/test/java/com/oit/dondok/domain/crew/service/CrewServiceTest.java" target="_blank" rel="noreferrer">원본 코드 보기</a></div>
          <h3>마지막 한 자리는<br />한 요청만 성공합니다.</h3>
          <div className={styles.concurrencySimulator}>
            <div className={styles.versionPill}>CREW · version {concurrencyRun ? "8" : "7"} · {concurrencyRun ? "6 / 6명" : "5 / 6명"}</div>
            <div className={styles.requestRow}><span>A 요청</span><i>동일한 version 7</i><b className={concurrencyRun ? styles.requestSuccess : ""}>{concurrencyRun ? "성공" : "대기"}</b></div>
            <div className={styles.requestRow}><span>B 요청</span><i>동일한 version 7</i><b className={concurrencyRun ? styles.requestFailure : ""}>{concurrencyRun ? "충돌" : "대기"}</b></div>
            {concurrencyRun && <p className={styles.concurrencyNote}><code>CONCURRENT_PAYMENT_ERROR</code> · B는 변경된 version과 일치하지 않아 실패합니다.</p>}
          </div>
          <button type="button" className={styles.runButton} onClick={() => setConcurrencyRun((value) => !value)}>{concurrencyRun ? "다시 보기" : "동시에 가입 요청하기"}</button>
        </article>

        <article className={`${styles.ruleCard} ${styles.aiRuleCard}`}>
          <div className={styles.ruleCardHead}><span>03 · AI 응답 검증</span><a href="https://github.com/jeonseong0120-source/dondok-be/blob/main/src/main/java/com/oit/dondok/infra/ai/adapter/OpenAiRecommendationAdapter.java" target="_blank" rel="noreferrer">원본 코드 보기</a></div>
          <h3>형식이 맞아 보여도<br />저장 전 다시 확인합니다.</h3>
          <div className={styles.aiOptions} role="group" aria-label="AI 응답 사례 선택">
            {(Object.keys(aiCases) as AiScenario[]).map((key) => <button type="button" key={key} className={aiScenario === key ? styles.selectedOption : ""} onClick={() => setAiScenario(key)}>{aiCases[key].label}</button>)}
          </div>
          <code className={styles.aiRaw}>{selectedAi.raw}</code>
          <div className={`${styles.ruleResult} ${selectedAi.tone === "error" ? styles.errorResult : styles.successResult}`} aria-live="polite">{selectedAi.tone === "error" && <code>AI_RESPONSE_INVALID</code>}<p><strong>{selectedAi.result}</strong>{selectedAi.detail}</p></div>
        </article>
      </div>
    </section>
  );
}
