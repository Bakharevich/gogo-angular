<div id="yandex_premium_56478"></div>
<!-- Yandex.Premium 56478 -->
<script type="text/javascript"><!--
(function(w, d, n, s, t) {
	function renderDirect () {
		Ya.Direct.insertInto("56478", "yandex_premium_56478", {
			ad_format: "premium",
			type: "vertical",
			limit: 3,
			favicon: true,
			no_sitelinks: false,
			sitelinks_color: "0000CC",
			title_font_size: 3,
			font_size: 0.9,
			site_bg_color: "FFFFFF",
			title_color: "0000CC",
			text_color: "000000",
			url_color: "006600",
			hover_color: "0000CC",
			links_underline: true,
			search_text: "<?= htmlspecialchars(urldecode($_REQUEST['word'])) ?>",
			search_page_number: <?= (int) $_REQUEST['page'] ?>
		});
	}

	w[n] = w[n] || []; w[n].push(renderDirect);
	t = d.getElementsByTagName("script")[0];
	s = d.createElement("script");
	s.type = "text/javascript";
	s.src = "//an.yandex.ru/system/context.js";
	s.async = true;
	t.parentNode.insertBefore(s, t);
})(window, document, "yandex_context_callbacks"); //-->
</script>