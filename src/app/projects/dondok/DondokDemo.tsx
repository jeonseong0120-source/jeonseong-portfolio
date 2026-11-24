"use client";

import { useState } from "react";
import styles from "./dondok.module.css";

const steps = [
  {
    label: "크루 탐색",
    title: "같은 목표를 가진 크루를 찾습니다.",
    description: "카테고리, 모집 상태와 보증금을 확인하고 참여할 크루를 고릅니다.",
  },
  {
    label: "가입 신청",
    title: "보증금을 예약하고 승인을 기다립니다.",
    description: "신청 시 보증금이 예약되며, 방장이 승인하면 참여 상태와 보증금이 확정됩니다.",
  },
  {
    label: "미션 인증",
    title: "정해진 일정에 맞춰 습관을 인증합니다.",
    description: "미션 수행 내역을 사진으로 남기고 크루 안에서 참여 기록을 쌓습니다.",
  },
  {
    label: "참여 정산",
    title: "참여 횟수만큼 공동 보증금을 나눕니다.",
    description: "크루가 종료되면 각 참여자의 미션 수행 횟수를 기준으로 환급 금액을 계산합니다.",
  },
];

function DemoScreen({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className={styles.demoList}>
        <div className={styles.demoAppBar}><strong>크루 찾기</strong><span>⌕</span></div>
        <div className={styles.demoFilters}><strong>전체</strong><span>모집 중</span><span>공부</span><span>운동</span></div>
        {[
          ["갓생 6시 기상", "🌅 기상", "8 / 10명", "20,000원"],
          ["코딩 실력 향상", "📝 공부", "4 / 6명", "30,000원"],
          ["매일 한 챕터", "📚 독서", "6 / 8명", "10,000원"],
        ].map(([title, category, members, deposit]) => (
          <div className={styles.demoCrewCard} key={title}>
            <div><span>{category}</span><strong>{title}</strong><small>{members}</small></div>
            <b>{deposit}</b>
          </div>
        ))}
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className={styles.demoJoin}>
        <div className={styles.demoPurpleCover}><span>📝 공부</span><h3>코딩 실력 향상</h3></div>
        <div className={styles.demoJoinBody}>
          <span className={styles.recruiting}>모집 중 · 4 / 6명</span>
          <p>매일 알고리즘 문제를 풀고 인증하며 함께 성장합니다.</p>
          <div><span>보증금</span><strong>30,000원</strong></div>
          <div className={styles.pendingBox}><strong>✓ 신청 완료</strong><span>방장 승인 대기 중</span></div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className={styles.demoCertify}>
        <div className={styles.demoAppBar}><strong>오늘의 미션</strong><span>6월 30일</span></div>
        <div className={styles.certifyProgress}>
          <span>코딩 실력 향상</span><strong>5일째 참여 중</strong><div><i /></div><small>5 / 28회 인증</small>
        </div>
        <div className={styles.uploadArea}><span>＋</span><strong>오늘의 인증 사진</strong><small>학습한 화면이나 노트를 올려주세요</small></div>
        <span className={styles.demoAction}>미션 인증하기</span>
      </div>
    );
  }

  return (
    <div className={styles.demoSettlement}>
      <div className={styles.demoAppBar}><strong>크루 정산</strong><span>완료</span></div>
      <div className={styles.settlementHero}><span>나의 참여</span><strong>24 / 28회</strong><small>상위 참여자</small></div>
      <div className={styles.shareRows}>
        <div><span>전체 참여 횟수</span><strong>102회</strong></div>
        <div><span>나의 지분</span><strong>23.5%</strong></div>
        <div><span>정산 기준</span><strong>참여 횟수</strong></div>
      </div>
      <div className={styles.refundBox}><span>참여 횟수에 따라</span><strong>공동 보증금 분배 완료</strong></div>
    </div>
  );
}

export default function DondokDemo() {
  const [step, setStep] = useState(0);

  return (
    <section className={styles.demoSection} id="demo">
      <div className={styles.demoHeading}>
        <p>30초 서비스 체험</p>
        <h2>돈독은 이렇게 사용합니다.</h2>
        <span>실제 서비스 흐름을 단순화한 포트폴리오용 데모입니다. 화면에는 샘플 데이터를 사용했습니다.</span>
      </div>

      <div className={styles.demoStage}>
        <div className={styles.stepCopy}>
          <div className={styles.stepTabs} role="tablist" aria-label="돈독 사용자 흐름">
            {steps.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={step === index}
                className={step === index ? styles.activeStep : ""}
                onClick={() => setStep(index)}
                key={item.label}
              >
                <span>{index + 1}</span>{item.label}
              </button>
            ))}
          </div>
          <div className={styles.stepDescription} aria-live="polite">
            <p>{steps[step].label}</p>
            <h3>{steps[step].title}</h3>
            <span>{steps[step].description}</span>
          </div>
          <div className={styles.stepControls}>
            <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>이전</button>
            <button type="button" onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))} disabled={step === steps.length - 1}>다음</button>
          </div>
        </div>

        <div className={styles.demoDevice}>
          <div className={styles.demoIsland} />
          <DemoScreen step={step} />
        </div>
      </div>
    </section>
  );
}
