const options = {
  rootMargin: "-300px 0px",
};

const intersectionObsever = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //   console.log(entry.traget);
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, options);

const boxElements = document.querySelectorAll("section");
console.log(boxElements);
boxElements.forEach((box) => {
  intersectionObsever.observe(box);
});

document.addEventListener("DOMContentLoaded", function () {
  // 요소들 가져오기
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");
  const progressBar = document.getElementById("progress-bar");
  const percentage = document.getElementById("percentage");

  // 로딩 변수들
  let currentProgress = 0;
  const loadingDuration = 3000; // 3초
  const updateInterval = 50; // 50ms마다 업데이트
  const progressStep = 100 / (loadingDuration / updateInterval);

  // 로딩 바 업데이트 함수
  function updateProgress() {
    if (currentProgress < 100) {
      currentProgress += progressStep;

      // 100을 넘지 않도록 제한
      if (currentProgress > 100) {
        currentProgress = 100;
      }

      // 프로그레스 바와 퍼센티지 업데이트
      progressBar.style.width = currentProgress + "%";
      percentage.textContent = Math.floor(currentProgress) + "%";

      // 다음 업데이트 예약
      setTimeout(updateProgress, updateInterval);
    } else {
      // 로딩 완료 후 페이드 효과 시작
      setTimeout(startFadeTransition, 500);
    }
  }

  // 페이드 트랜지션 함수
  function startFadeTransition() {
    // 로딩 화면 페이드 아웃
    loadingScreen.classList.add("fade-out");

    // 메인 콘텐츠 페이드 인 (약간의 지연)
    setTimeout(() => {
      mainContent.classList.add("fade-in");
    }, 400);

    // 로딩 화면 완전 제거 (애니메이션 완료 후)
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 800);
  }

  // 로딩 시작 (페이지 로드 후 약간의 지연)
  setTimeout(() => {
    updateProgress();
  }, 300);

  // 추가: 실제 리소스 로딩 시뮬레이션 (선택사항)
  simulateResourceLoading();
});

// 실제 리소스 로딩 시뮬레이션 함수
function simulateResourceLoading() {
  const resources = [
    "images/background.jpg",
    "fonts/custom-font.woff2",
    "data/content.json",
    "scripts/modules.js",
    "styles/theme.css",
  ];

  let loadedResources = 0;
  const totalResources = resources.length;

  // 각 리소스에 대해 랜덤 로딩 시간 시뮬레이션
  resources.forEach((resource, index) => {
    const loadTime = Math.random() * 1000 + 500; // 500-1500ms

    setTimeout(() => {
      loadedResources++;
      console.log(`Loaded: ${resource} (${loadedResources}/${totalResources})`);

      if (loadedResources === totalResources) {
        console.log("All resources loaded!");
      }
    }, loadTime);
  });
}
