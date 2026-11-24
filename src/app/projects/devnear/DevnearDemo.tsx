"use client";

import { useState } from "react";
import styles from "./devnear.module.css";

const steps = [
  { label: "역할 선택", title: "서비스에서 맡을 역할을 선택합니다.", description: "클라이언트와 프리랜서는 서로 다른 정보로 프로필을 만들고 각 역할에 맞는 기능을 사용합니다." },
  { label: "조건 입력", title: "프로젝트에 필요한 조건을 입력합니다.", description: "활동 지역, 필요한 기술과 프로젝트 조건을 입력해 찾고 싶은 사람의 기준을 정합니다." },
  { label: "후보 추천", title: "조건에 맞는 후보와 근거를 확인합니다.", description: "지역으로 후보를 좁히고 기술, 평점, 수행 경험을 점수로 바꿔 추천 순서를 보여줍니다." },
  { label: "제안 연결", title: "프로필을 확인하고 제안을 보냅니다.", description: "추천 결과의 상세 경력과 보유 기술을 확인한 뒤 프로젝트 참여를 제안합니다." },
];

function DemoScreen({ step }: { step: number }) {
  if (step === 0) return (
    <div className={styles.roleScreen}>
      <div className={styles.demoNav}><strong>DEVNEAR</strong><span>시작하기</span></div>
      <div className={styles.screenTitle}><small>STEP 01</small><h3>어떤 역할로<br />시작하시나요?</h3><p>나중에 역할을 추가할 수 있습니다.</p></div>
      <div className={styles.roleCards}>
        <div><span>프로젝트를 맡기고 싶어요</span><strong>클라이언트</strong><small>조건에 맞는 전문가 찾기</small></div>
        <div className={styles.selectedRole}><span>프로젝트에 참여하고 싶어요</span><strong>프리랜서</strong><small>나에게 맞는 프로젝트 찾기</small></div>
      </div>
    </div>
  );

  if (step === 1) return (
    <div className={styles.conditionScreen}>
      <div className={styles.demoNav}><strong>프로젝트 등록</strong><span>2 / 3</span></div>
      <div className={styles.conditionBody}>
        <small>필요한 사람의 조건</small><h3>백엔드 개발자</h3>
        <label>활동 지역<div><strong>서울</strong><span>경기</span><span>원격</span></div></label>
        <label>필요 기술<div><strong>Java</strong><strong>Spring</strong><span>MySQL</span><span>Redis</span></div></label>
        <label>프로젝트 기간<div className={styles.inputMock}>3개월</div></label>
        <span className={styles.demoAction}>조건에 맞는 프리랜서 보기</span>
      </div>
    </div>
  );

  if (step === 2) return (
    <div className={styles.recommendScreen}>
      <div className={styles.demoNav}><strong>추천 결과</strong><span>12명</span></div>
      <div className={styles.recommendBody}>
        <small>입력한 조건을 기준으로 정렬했습니다.</small>
        {[
          ["윤서진", "백엔드 개발자", "94", "Java · Spring · MySQL"],
          ["김도현", "풀스택 개발자", "89", "Java · React · AWS"],
          ["이하늘", "서버 개발자", "84", "Spring · MySQL · Redis"],
        ].map(([name, role, score, skills], index) => (
          <div className={styles.recommendCard} key={name}>
            <div className={`${styles.avatar} ${styles[`avatar${index + 1}`]}`}>{name.slice(0, 1)}</div>
            <div><span>{role}</span><strong>{name}</strong><small>{skills}</small></div>
            <b>{score}<em>%</em></b>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.proposalScreen}>
      <div className={styles.profileHero}><span className={styles.largeAvatar}>윤</span><small>백엔드 개발자</small><h3>윤서진</h3><p>복잡한 요구사항을 안정적인 API로 구현합니다.</p></div>
      <div className={styles.profileBody}>
        <div><span>추천 점수</span><strong>94%</strong></div>
        <div><span>보유 기술</span><p><b>Java</b><b>Spring</b><b>MySQL</b></p></div>
        <div><span>프로젝트</span><strong>완료 12건 · 평점 4.8</strong></div>
        <span className={styles.demoAction}>프로젝트 제안 보내기</span>
      </div>
    </div>
  );
}

export default function DevnearDemo() {
  const [step, setStep] = useState(0);
  return (
    <section className={styles.demoSection} id="demo">
      <div className={styles.demoHeading}>
        <p>30초 서비스 체험</p>
        <h2>데브니어는 이렇게 연결합니다.</h2>
        <span>실제 서비스 흐름을 단순화한 포트폴리오용 데모입니다. 화면에는 샘플 데이터를 사용했습니다.</span>
      </div>
      <div className={styles.demoStage}>
        <div className={styles.stepCopy}>
          <div className={styles.stepTabs} role="tablist" aria-label="데브니어 사용자 흐름">
            {steps.map((item, index) => (
              <button type="button" role="tab" aria-selected={step === index} className={step === index ? styles.activeStep : ""} onClick={() => setStep(index)} key={item.label}>
                <span>{index + 1}</span>{item.label}
              </button>
            ))}
          </div>
          <div className={styles.stepDescription} aria-live="polite">
            <p>{steps[step].label}</p><h3>{steps[step].title}</h3><span>{steps[step].description}</span>
          </div>
          <div className={styles.stepControls}>
            <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>이전</button>
            <button type="button" onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))} disabled={step === steps.length - 1}>다음</button>
          </div>
        </div>
        <div className={styles.demoBrowser}>
          <div className={styles.demoBrowserTop}><div><span /><span /><span /></div><p>devnear.app</p></div>
          <DemoScreen step={step} />
        </div>
      </div>
    </section>
  );
}
