import "./style.scss";
import Ref from "html-tag-js/ref";
import settings from "lib/settings";
import {
	$footer,
	$input,
	$toggler,
	ScrollableButtons,
	SearchRow1,
	SearchRow2,
} from "./footer";

let $scrollableButtons;

const $searchInput = Ref();
const $replaceInput = Ref();
const $searchPos = Ref();
const $searchTotal = Ref();

export default {
	get $footer() {
		return $footer;
	},
	get $scrollableButtons() {
		if ($scrollableButtons) return $scrollableButtons;
		$scrollableButtons = <ScrollableButtons />;

		settings.on("update:quicktoolsItems:after", () => {
			$scrollableButtons = <ScrollableButtons />;
		});

		return $scrollableButtons;
	},
	get $searchRow1() {
		if ($searchRow1) return $searchRow1;
		$searchRow1 = <SearchRow1 inputRef={$searchInput} />;
		return $searchRow1;
	},
	get $searchRow2() {
		if ($searchRow2) return $searchRow2;
		$searchRow2 = (
			<SearchRow2
				inputRef={$replaceInput}
				posRef={$searchPos}
				totalRef={$searchTotal}
			/>
		);
		return $searchRow2;
	},
	get $input() {
		return $input;
	},
	get $toggler() {
		return $toggler;
	},
	get $searchInput() {
		return $searchInput;
	},
	get $replaceInput() {
		return $replaceInput;
	},
	get $searchPos() {
		return $searchPos;
	},
	get $searchTotal() {
		return $searchTotal;
	},
};
