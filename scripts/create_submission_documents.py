"""Create the concise resume and two-page project summary for applications."""

from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf"
FONT_PATH = "/System/Library/Fonts/Supplemental/AppleGothic.ttf"
PHOTO_PATH = "/Users/mac/Documents/Codex/2026-09-30/dkss/work/intro-photo-left.jpg"
W, H = A4
INK = HexColor("#161616")
MUTED = HexColor("#6A6A6A")
LINE = HexColor("#C7C7C7")
ACCENT = HexColor("#263E7A")

pdfmetrics.registerFont(TTFont("AppleGothic", FONT_PATH))


def txt(c, value, x, y, size=9, color=INK, font="AppleGothic"):
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString(x, y, value)


def bold(c, value, x, y, size=9, color=INK):
    # AppleGothic covers Korean; a slight offset gives headings enough weight.
    txt(c, value, x, y, size, color)
    txt(c, value, x + 0.2, y, size, color)


def rule(c, x, y, width, color=LINE, thickness=0.6):
    c.setStrokeColor(color)
    c.setLineWidth(thickness)
    c.line(x, y, x + width, y)


def wrap(c, value, x, y, width, size=9, leading=14, color=INK):
    c.setFont("AppleGothic", size)
    c.setFillColor(color)
    line = ""
    for word in value.split(" "):
        next_line = (line + " " + word).strip()
        if line and c.stringWidth(next_line, "AppleGothic", size) > width:
            c.drawString(x, y, line)
            y -= leading
            line = word
        else:
            line = next_line
    if line:
        c.drawString(x, y, line)
        y -= leading
    return y


def section(c, name, y):
    bold(c, name, 40, y, 10.5)
    rule(c, 40, y - 9, W - 80, ACCENT, 1.1)
    return y - 30


def bullet(c, value, y, width=500):
    txt(c, "•", 44, y, 9.5)
    return wrap(c, value, 58, y, width, 9.2, 14) - 4


def header(c, title, subtitle=""):
    c.setFillColor(white)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    txt(c, "JEONSEONG", 40, H - 43, 10, MUTED)
    bold(c, title, 40, H - 78, 24)
    if subtitle:
        txt(c, subtitle, 40, H - 99, 9.5, MUTED)
    rule(c, 40, H - 117, W - 80, ACCENT, 1.2)


def footer(c, page, label):
    rule(c, 40, 38, W - 80)
    txt(c, "jeonseong0120@gmail.com", 40, 20, 7.5, MUTED)
    txt(c, "https://jeonseong-portfolio.vercel.app", 235, 20, 7.5, MUTED)
    txt(c, f"{page:02d}  {label}", W - 110, 20, 7.5, MUTED)


def resume(path: Path, include_phone: bool = True):
    c = canvas.Canvas(str(path), pagesize=A4)
    c.setTitle("전성 이력서")
    # This page intentionally mirrors the first page of the detailed portfolio:
    # restrained header, portrait on the left, then concise evidence below.
    c.setFillColor(white)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    txt(c, "RESUME", 35, H - 32, 17)
    txt(c, "2026", W - 61, H - 31, 8.5, MUTED)
    rule(c, 0, H - 45, W, HexColor("#8E8E8E"), 0.5)
    c.drawImage(str(PHOTO_PATH), 35, H - 335, width=169, height=290)

    x = 235
    bold(c, "전성", x, H - 86, 29)
    txt(c, "BACKEND DEVELOPER", x, H - 113, 12.3, MUTED)
    rule(c, x, H - 138, 294, HexColor("#555555"), 0.7)

    bold(c, "ABOUT ME", x, H - 176, 16.5)
    rule(c, x, H - 186, 294, HexColor("#AAAAAA"), 0.5)
    txt(c, "API 구현에서 끝내지 않고, 실제 사용자 흐름과 화면 동작까지", x, H - 205, 9.2, MUTED)
    txt(c, "함께 확인하며 개발합니다.", x, H - 221, 9.2, MUTED)
    bold(c, "TECH STACK", x, H - 251, 11.8)
    txt(c, "Java 17 · Spring Boot · Spring Security · JPA · QueryDSL · MySQL", x, H - 268, 8.0, HexColor("#555555"))
    txt(c, "Redis · Docker · React · TypeScript · Next.js", x, H - 282, 8.0, HexColor("#555555"))
    rule(c, 35, H - 335, W - 70, HexColor("#555555"), 0.7)

    # Two projects replace the former three-column proof band.
    bold(c, "PROJECTS", 35, H - 365, 17)
    rule(c, 35, H - 375, W - 70, HexColor("#AAAAAA"), 0.5)
    for px, number, title, detail in [
        (35, "01", "DONDOK  |  지분 기반 습관 형성 서비스 · 5인", "크루 생성·탐색·상세·가입 신청 흐름과 상태 전환 배치를 구현하고,\n낙관적 락으로 동시 가입 정합성을 제어"),
        (300, "02", "DEVNEAR  |  지역·기술 기반 프리랜서 매칭 서비스 · 4인", "JWT Claim 기반 역할별 인증, 설명 가능한 규칙 기반 매칭,\nJPA 상태 문제 해결 담당"),
    ]:
        txt(c, number, px, H - 395, 8.5, MUTED)
        bold(c, title, px, H - 413, 8.7)
        line1, line2 = detail.split("\n")
        txt(c, line1, px, H - 431, 8.0, HexColor("#555555"))
        txt(c, line2, px, H - 444, 8.0, HexColor("#555555"))

    bold(c, "SELECTED EXPERIENCE", 35, H - 484, 15.5)
    rule(c, 35, H - 494, W - 70, HexColor("#AAAAAA"), 0.5)
    bold(c, "(주)그렙 AI Team Internship", 35, H - 513, 10.5)
    txt(c, "2026.07 - 2026.08", 430, H - 513, 8.3, MUTED)
    txt(c, "4인 팀에서 MVP 범위·일정 조율, 주요 화면 구현과 API 연동, 발표 준비 수행", 35, H - 533, 8.0, MUTED)
    bold(c, "프로그래머스 데브코스 AI 백엔드 과정", 35, H - 558, 10.5)
    txt(c, "2025.12 - 2026.06", 430, H - 558, 8.3, MUTED)
    txt(c, "Web/App 서비스 팀 프로젝트 4회 수행", 35, H - 578, 8.0, MUTED)
    rule(c, 0, H - 603, W, HexColor("#8E8E8E"), 0.5)

    bold(c, "EDUCATION", 35, H - 638, 14)
    rule(c, 35, H - 649, 169, HexColor("#AAAAAA"), 0.5)
    txt(c, "명지전문대학 AI빅데이터학과 졸업", 35, H - 668, 9.2)
    txt(c, "2022.03 - 2025.08", 35, H - 687, 8.5, MUTED)
    txt(c, "정석항공과학고등학교 졸업", 35, H - 719, 9.2)
    txt(c, "2019.03 - 2022.02", 35, H - 738, 8.5, MUTED)

    bold(c, "ACADEMIC ACTIVITIES", 235, H - 638, 14)
    rule(c, 235, H - 649, 295, HexColor("#AAAAAA"), 0.5)
    academics = [
        ("구독 서비스 난립에 따른 과다 지출 문제 해결을 위한 웹 애플리케이션 개발", "한국컴퓨터정보학회 하계학술대회 · 제1저자 · 2025.07"),
        ("시각장애인을 위한 라이다 센서를 활용한 장애물 감지", "한국컴퓨터정보학회 동계학술대회 · 공동저자 · 2023.01"),
        ("아두이노와 안드로이드 OS를 이용한 온도측정 시스템 구현", "한국컴퓨터정보학회 하계학술대회 · 공동저자 · 2022.07"),
    ]
    ay = H - 670
    for title, note in academics:
        txt(c, title, 235, ay, 7.7)
        txt(c, note, 235, ay - 20, 7.1, MUTED)
        ay -= 55

    rule(c, 35, 42, W - 70, HexColor("#AAAAAA"), 0.5)
    bold(c, "CONTACT", 35, 23, 9.5)
    contact = "010-4679-4787  ·  jeonseong0120@gmail.com" if include_phone else "jeonseong0120@gmail.com"
    contact_x = 110 if include_phone else 190
    txt(c, contact, contact_x, 23, 7.3, MUTED)
    txt(c, "github.com/jeonseong0120-source", 335, 23, 7.3, MUTED)
    txt(c, "jeonseong-portfolio.vercel.app", 335, 12, 7.3, ACCENT)
    c.linkURL("mailto:jeonseong0120@gmail.com", (contact_x, 20, 315, 34), relative=0)
    c.linkURL("https://github.com/jeonseong0120-source", (335, 20, 530, 34), relative=0)
    c.linkURL("https://jeonseong-portfolio.vercel.app", (335, 10, 530, 21), relative=0)
    c.save()


def project_page(c, project, role, tech, points, verification, page, image_path, flow_copy):
    header(c, project, role)
    txt(c, tech, 40, H - 138, 8.6, MUTED)
    y = section(c, "KEY CONTRIBUTIONS", H - 180)
    for point in points:
        y = bullet(c, point, y)
        y -= 5
    y = section(c, "CONFIRMATION & LIMIT", y - 8)
    for item in verification:
        y = bullet(c, item, y)
        y -= 5
    y = section(c, "REPRESENTATIVE SCREEN", y - 8)
    txt(c, flow_copy, 40, y, 8.8, MUTED)
    image_height = 150 if project == "DEVNEAR" else 170
    c.drawImage(str(image_path), 40, 74, width=505, height=image_height, preserveAspectRatio=True, anchor="c")
    txt(c, "구현 근거, 코드 링크, 사용자 흐름 체험: https://jeonseong-portfolio.vercel.app", 40, 55, 7.7, ACCENT)
    c.linkURL("https://jeonseong-portfolio.vercel.app", (40, 50, 400, 65), relative=0)
    footer(c, page, "PROJECT SUMMARY")
    c.showPage()


def summary(path: Path):
    c = canvas.Canvas(str(path), pagesize=A4)
    c.setTitle("전성 프로젝트 요약")
    project_page(
        c,
        "DONDOK",
        "지분 기반 습관 형성 서비스  ·  Backend / Frontend  ·  5인",
        "Java 17 · Spring Boot · JPA · QueryDSL · MySQL · Next.js · TypeScript",
        [
            "동시 가입에서 정원을 지키는 낙관적 락 제어: Crew.version과 OPTIMISTIC_FORCE_INCREMENT를 적용하고, 모집 상태·마감 시각·현재 신청 인원을 확인한 뒤 참가자를 저장했습니다.",
            "일정 기반 상태 전환: KST 자정 기준 신청 만료 → 활성화 또는 인원 미달 취소 → 종료 전환 순서로 배치를 구성했습니다.",
            "외부 AI 응답 검증: 빈 응답과 파싱 실패를 모두 유효하지 않은 AI 응답 오류로 처리하고, 서버 규칙을 통과한 초안만 생성 화면에 반영했습니다.",
        ],
        [
            "동시성 예외가 의도한 오류 코드로 변환되는 서비스 테스트를 추가했습니다.",
            "동시 요청 수를 측정하는 부하 테스트는 미수행입니다.",
        ],
        1,
        "/Users/mac/Documents/Codex/2026-09-30/dkss/work/portfolio_pdf_assets/dondok_1.png",
        "크루 탐색 → 가입 신청 → 방장 승인 → 미션 참여 → 정산",
    )
    project_page(
        c,
        "DEVNEAR",
        "지역·기술 기반 프리랜서 매칭 서비스  ·  Backend / Frontend  ·  4인",
        "Java 17 · Spring Boot · JPA · MySQL · Redis · React · Docker · WebSocket",
        [
            "JWT Claim과 요청 범위 사용자 조회를 분리한 인증 흐름: 인증 필터 단계의 사용자 DB 조회를 제거하고, 서비스 계층에서는 필요한 경우 1회 조회 후 같은 요청 안에서 재사용했습니다.",
            "설명 가능한 규칙 기반 매칭: 요구 기술·보유 기술 교집합 50%, 평점 정규화 30%, 완료 프로젝트 수 20%를 기본 점수로 사용하고, 소개·기술 입력 시 최대 0.01 보너스를 더했습니다. 동점은 평점 → 완료 수 → ID 순으로 정렬했습니다.",
            "JPA 쓰기 지연으로 인한 복합키 충돌과 저장 후 404를 P6Spy로 원인 확인 후 해결했습니다.",
        ],
        [
            "매칭 가중치는 MVP 단계의 초기 가설이며, 클릭률·제안 수락률·매칭 성사율 기반 검증은 미수행입니다.",
        ],
        2,
        "/Users/mac/Documents/Codex/2026-09-30/dkss/work/portfolio_pdf_assets/devnear_2.png",
        "조건 입력 → 지역 선필터링 → 규칙 기반 점수 계산 → 추천 결과 조회",
    )
    c.save()


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    resume(OUT / "전성_이력서_1p.pdf")
    resume(ROOT / "public" / "jeonseong-resume.pdf", include_phone=False)
    summary(OUT / "전성_프로젝트_요약_2p.pdf")


if __name__ == "__main__":
    main()
