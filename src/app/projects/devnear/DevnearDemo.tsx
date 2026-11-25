"use client";

import { useMemo, useState } from "react";
import styles from "./devnear.module.css";

const skillOptions = ["Java", "Spring", "MySQL", "Redis", "React"];

type Candidate = { id: number; name: string; skills: string[]; rating: number; completed: number; introduction: boolean };

const baseCandidates: Candidate[] = [
  { id: 18, name: "윤서진", skills: ["Java", "Spring", "MySQL", "Redis"], rating: 4.8, completed: 12, introduction: true },
  { id: 22, name: "김도현", skills: ["Java", "Spring", "React"], rating: 4.9, completed: 18, introduction: true },
  { id: 31, name: "이하늘", skills: ["Spring", "MySQL", "Redis"], rating: 4.6, completed: 8, introduction: false },
];

function score(candidate: Candidate, required: string[]) {
  const matched = required.filter((skill) => candidate.skills.includes(skill)).length;
  const skillScore = required.length ? (matched / required.length) * 0.5 : 0;
  const ratingScore = (candidate.rating / 5) * 0.3;
  const experienceScore = Math.min(candidate.completed / 10, 1) * 0.2;
  const bonus = (candidate.introduction ? 0.005 : 0) + (candidate.skills.length ? 0.005 : 0);
  return skillScore + ratingScore + experienceScore + bonus;
}

export default function DevnearDemo() {
  const [required, setRequired] = useState(["Java", "Spring", "MySQL"]);
  const [candidateSkills, setCandidateSkills] = useState(["Java", "Spring", "MySQL"]);
  const [rating, setRating] = useState(4.8);
  const [completed, setCompleted] = useState(12);
  const [introduction, setIntroduction] = useState(true);

  const candidates = useMemo(() => {
    const editable: Candidate = { id: 10, name: "내가 바꾼 후보", skills: candidateSkills, rating, completed, introduction };
    return [...baseCandidates, editable]
      .map((candidate) => ({ ...candidate, score: score(candidate, required) }))
      .sort((a, b) => b.score - a.score || b.rating - a.rating || b.completed - a.completed || b.id - a.id);
  }, [candidateSkills, completed, introduction, rating, required]);

  const toggleSkill = (skill: string) => setRequired((current) => current.includes(skill) ? current.filter((value) => value !== skill) : [...current, skill]);
  const toggleCandidateSkill = (skill: string) => setCandidateSkills((current) => current.includes(skill) ? current.filter((value) => value !== skill) : [...current, skill]);
  const editedScore = candidates.find((candidate) => candidate.id === 10)?.score ?? 0;

  return (
    <section className={styles.demoSection} id="demo">
      <div className={styles.demoHeading}>
        <p>규칙 체험</p>
        <h2>추천 점수는<br />어떻게 달라질까요?</h2>
        <span>실제 매칭 조회식의 가중치와 정렬 기준을 브라우저에서 재현한 포트폴리오용 체험입니다. 실제 추천 API를 호출하지 않습니다.</span>
      </div>

      <div className={styles.matchLab}>
        <div className={styles.matchControls}>
          <div className={styles.ruleCardHead}><span>매칭 점수 계산기</span><a href="https://github.com/jeonseong0120-source/devnear/blob/main/backend/src/main/java/com/devnear/web/domain/freelancer/FreelancerProfileRepositoryImpl.java" target="_blank" rel="noreferrer">원본 코드 보기</a></div>
          <h3>조건을 바꾸면<br />순서도 바뀝니다.</h3>
          <fieldset className={styles.controlGroup}>
            <legend>요구 기술</legend>
            <div>{skillOptions.map((skill) => <button type="button" className={required.includes(skill) ? styles.selectedOption : ""} onClick={() => toggleSkill(skill)} key={skill}>{skill}</button>)}</div>
          </fieldset>
          <fieldset className={styles.controlGroup}>
            <legend>후보 보유 기술</legend>
            <div>{skillOptions.map((skill) => <button type="button" className={candidateSkills.includes(skill) ? styles.selectedOption : ""} onClick={() => toggleCandidateSkill(skill)} key={skill}>{skill}</button>)}</div>
          </fieldset>
          <label className={styles.rangeControl}>평점 <strong>{rating.toFixed(1)} / 5.0</strong><input type="range" min="3" max="5" step="0.1" value={rating} onChange={(event) => setRating(Number(event.target.value))} /></label>
          <label className={styles.rangeControl}>완료 프로젝트 <strong>{completed}건</strong><input type="range" min="0" max="20" step="1" value={completed} onChange={(event) => setCompleted(Number(event.target.value))} /></label>
          <label className={styles.switchControl}><input type="checkbox" checked={introduction} onChange={(event) => setIntroduction(event.target.checked)} /><span>소개 입력</span><b>+0.005</b></label>
          <div className={styles.ruleFormula}><span>기술 일치 50% · 평점 30% · 수행 경험 20%</span><strong>프로필 보너스 최대 +0.01</strong></div>
        </div>

        <div className={styles.matchResults}>
          <div className={styles.resultsHead}><span>추천 결과</span><strong>점수 → 평점 → 완료 수 → ID</strong></div>
          <ol>
            {candidates.map((candidate, index) => (
              <li className={candidate.id === 10 ? styles.editableCandidate : ""} key={candidate.id}>
                <span className={styles.rank}>{index + 1}</span>
                <div><strong>{candidate.name}</strong><small>{candidate.skills.join(" · ") || "기술 없음"}</small><em>평점 {candidate.rating.toFixed(1)} · 완료 {candidate.completed}건 · ID {candidate.id}</em></div>
                <b>{candidate.score.toFixed(3)}</b>
              </li>
            ))}
          </ol>
          <p className={styles.matchNote}>현재 편집 중인 후보의 점수는 <strong>{editedScore.toFixed(3)}</strong>입니다. 소개·기술 입력 보너스는 최대 0.01만 더해집니다.</p>
        </div>
      </div>
    </section>
  );
}
