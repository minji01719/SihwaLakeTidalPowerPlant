console.clear();
AOS.init();

function TopBarMenu__init() {
	$(".top-bar__menu-1 > ul").mouseenter(function () {
		$(".top-bar__menu-1").addClass("active");
	});

	$(".top-bar__menu-1").mouseleave(function () {
		$(".top-bar__menu-1").removeClass("active");
	});
}

TopBarMenu__init();

function ListIconHover() {
	$(".list-icon, .logo-box")
		.mouseenter(function () {
			$(".logo-box").addClass("active");
			$(".top-bar__menu-1 > ul").addClass("active");
		})
		.mouseleave(function () {
			$(".logo-box").removeClass("active");
			$(".top-bar__menu-1 > ul").removeClass("active");
		});
}

ListIconHover();

// 클릭했으때 top으로
function FloatingClick() {
	$(document).ready(function () {
		$(".floating").bind("click", function () {
			$("html, body").animate({ scrollTop: "0" }, 500);
		});
	});
}

FloatingClick();

// 히든메뉴 반응형
function HiddenMenuBox__init() {
	$(".list-icon").click(function () {
		$(".hidden-menu-box").addClass("active");
	});

	$(".full-close, .hidden-menu").click(function () {
		$(".hidden-menu-box").removeClass("active");

		$(".hidden-menu-box .hidden-menu-2").stop().slideUp(400);
		$(".hidden-menu-box .hidden-menu-1 > li").removeClass("active");
	});

	$(".full-close, .list-icon").click(function () {
		$(".hidden-menu-2 ul").removeClass("active");
	});

	$(".hidden-menu-box .menu-box").click(function (e) {
		e.stopPropagation();
		return false;
	});
}
HiddenMenuBox__init();

// 히든(아코디언)메뉴
function MenuBox__init() {
	$(".hidden-menu-box  .hidden-menu-1 > li").click(function () {
		let $this = $(this);
		let has = $(this).hasClass("active");

		$this.siblings(".active").find("ul").stop().slideUp(400);
		$this.siblings(".active").find(".active").removeClass("active");
		$this.siblings(".active").removeClass("active");

		if (has) {
			$this.find("> ul").stop().slideUp(400);
			$this.find(".active").removeClass("active");
			$this.removeClass("active");
		} else {
			$this.find("> ul").stop().slideDown(400);
			$this.addClass("active");
		}
	});

	$(".hidden-menu-box ul").click(function () {
		return false;
	});
}
MenuBox__init();

// 배너4 스와이퍼
function SwiperBox__init(no) {
	const swiper = new Swiper(`.tab-box__body .swiper-${no}`, {
		// 스와이퍼 속성 정의
		loop: true, // 슬라이드 반복여부
		speed: 1000, // 슬라이드 넘어가는 속도
		slidesPerView: 1, // 한 화면에서 보여질 슬라이드 개수
		slidesPerGroup: 3, // 슬라이시 넘길 슬라이드 개수
		spaceBetween: 30, // 슬라이드 사이의 여백
		autoplay: {
			delay: 5000
		},
		breakpoints: {
			1100: {
				slidesPerView: 4
			},
			800: {
				slidesPerView: 3
			},
			600: {
				slidesPerView: 2
			}
		},
		pagination: {
			type: "bullets",
			el: ".tourism-box .swiper-pagination",
			clickable: true // 페이지네이션 버튼 클릭
		},
		navigation: {
			nextEl: ".tourism-box .swiper-button__next",
			prevEl: ".tourism-box .swiper-button__prev"
		}
	});
}

SwiperBox__init(1);
SwiperBox__init(2);
SwiperBox__init(3);

// 배너4 탭메뉴
function TabBox__changed(eventType, tbName, tbItemNo) {
	//console.log(`eventType : ${eventType}, tbName : ${tbName}, tbItemNo : ${tbItemNo}`);
}
function TabBox__init() {
	$("[data-tb]").each(function (index, el) {
		const $el = $(el);
		const tbAttrValue = $el.attr("data-tb");

		const tbAttrValueBits = tbAttrValue.split("__");

		const tbName = tbAttrValueBits[0];
		const tbItemNo = parseInt(tbAttrValueBits[1]);
		const tbItemType = tbAttrValueBits[2];

		$el.data("data-tbName", tbName);
		$el.data("data-tbItemNo", tbItemNo);
		$el.data("data-tbItemType", tbItemType);

		if (tbItemType == "head") {
			const $items = $(`[data-tb^="${tbName}__"]`);
			const $bodyItem = $(`[data-tb="${tbName}__${tbItemNo}__body"]`);

			$el.click(function () {
				const $activedItems = $(`[data-tb^="${tbName}__"].tb-active`);

				if ($activedItems.length > 0) {
					const oldNo = $activedItems.eq(0).data("data-tbItemNo");

					if (oldNo == tbItemNo) {
						return;
					}

					$activedItems.removeClass("tb-active");
					$("html").removeClass(`${tbName}__${oldNo}__actived`);
					if (TabBox__changed) {
						TabBox__changed("inactive", tbName, oldNo);
					}
				}

				$(`[data-tb="${tbName}__${tbItemNo}__head"]:not(.tb-active)`).addClass(
					"tb-active"
				);
				$bodyItem.addClass("tb-active");

				$("html").addClass(`${tbName}__${tbItemNo}__actived`);
				if (TabBox__changed) {
					TabBox__changed("active", tbName, tbItemNo);
				}
			});
		}
	});

	$("[data-tb-clicked]").click();
}

TabBox__init();
