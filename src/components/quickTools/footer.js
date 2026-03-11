/**
 * @typedef {import('html-tag-js/ref')} Ref
 */

import settings from "lib/settings";
import items, { ref } from "./items";

export const ScrollableButtons = () => {
	const quicktoolsItems = settings.value.quicktoolsItems || [];
	const columnsPerRow = settings.QUICKTOOLS_GROUP_CAPACITY;
	const totalRows = Math.ceil(quicktoolsItems.length / columnsPerRow);

	const rows = [];
	for (let row = 0; row < totalRows; row++) {
		const rowItems = [];
		for (let col = 0; col < columnsPerRow; col++) {
			const index = row * columnsPerRow + col;
			const itemIndex = quicktoolsItems[index];
			const item = items[itemIndex];
			rowItems.push(<RowItem {...item} index={index} />);
		}
		rows.push(
			<div className="button-container">
				<div className="section">{rowItems}</div>
			</div>,
		);
	}

	return <div className="scrollable-rows">{rows}</div>;
};

export const Row = ({ row }) => {
	const startIndex =
		(row - 1) * settings.QUICKTOOLS_GROUP_CAPACITY * settings.QUICKTOOLS_GROUPS;
	return (
		<div id={`row${row}`} className="button-container">
			{(() => {
				const sections = [];
				for (let i = 0; i < settings.QUICKTOOLS_GROUPS; ++i) {
					const section = [];
					for (let j = 0; j < settings.QUICKTOOLS_GROUP_CAPACITY; ++j) {
						const index =
							startIndex + (i * settings.QUICKTOOLS_GROUP_CAPACITY + j);
						const itemIndex = settings.value.quicktoolsItems[index]; // saved item index
						const item = items[itemIndex]; // item object
						section.push(<RowItem {...item} index={index} />);
					}
					sections.push(<div className="section">{section}</div>);
				}
				return sections;
			})()}
		</div>
	);
};

/**
 * Create a search row with search input and buttons
 * @returns {Element}
 */
export const SearchRow1 = ({ inputRef }) => (
	<div className="button-container" id="search_row1">
		<input ref={inputRef} type="search" placeholder={strings.search} />
		<RowItem icon="arrow_back" action="search-prev" />
		<RowItem icon="arrow_forward" action="search-next" />
		<RowItem icon="settings" action="search-settings" />
	</div>
);

/**
 * Create a search row with replace input and buttons
 * @returns {Element}
 */
export const SearchRow2 = ({ inputRef, posRef, totalRef }) => (
	<div className="button-container" id="search_row2">
		<input ref={inputRef} type="text" placeholder={strings.replace} />
		<RowItem icon="replace" action="search-replace" />
		<RowItem icon="replace_all" action="search-replace-all" />
		<div className="search-status">
			<span ref={posRef}>0</span>
			<span>of</span>
			<span ref={totalRef}>0</span>
		</div>
	</div>
);

function getFixedButtons() {
	return (
		settings.value.quicktoolsFixedItems ??
		settings.QUICKTOOLS_DEFAULT_FIXED_ITEM_INDICES
	);
}

function getFixedButtonsByRow() {
	const fixedButtons = getFixedButtons();
	const row1 = fixedButtons.slice(0, 3);
	const row2 = fixedButtons.slice(3, 6);
	return [row1, row2];
}

export function generateFooter() {
	const [row1, row2] = getFixedButtonsByRow();
	return (
		<footer id="quick-tools" tabIndex={-1}>
			<div className="fixed-area">
				<div className="fixed-row">
					{row1.map((itemIndex) => (
						<RowItem {...items[itemIndex]} />
					))}
				</div>
				<div className="fixed-row">
					{row2.map((itemIndex) => (
						<RowItem {...items[itemIndex]} />
					))}
				</div>
			</div>
			<div className="scrollable-area">
				<ScrollableButtons />
			</div>
		</footer>
	);
}

export const $footer = generateFooter();

export const $toggler = (
	<span
		className="floating icon keyboard_arrow_up"
		id="quicktools-toggler"
	></span>
);

export const $input = (
	<textarea
		autocapitalize="none"
		style={{
			opacity: 0,
			height: 0,
			width: 0,
			pointerEvent: "none",
			pointerEvents: "none",
			position: "fixed",
			top: 0,
			left: 0,
		}}
	></textarea>
);

export function RowItem({ id, icon, letters, action, value, ref, repeat }) {
	const $item = (
		<button
			ref={ref}
			className={`icon ${icon}`}
			data-id={id}
			data-letters={letters}
			data-action={action}
			data-repeat={repeat}
		></button>
	);

	if (typeof value === "function") {
		$item.value = value;
	} else if (value !== undefined) {
		$item.dataset.value = value;
	}

	return $item;
}

function Extras({ extras }) {
	const div = <div className="section"></div>;
	if (Array.isArray(extras)) {
		extras.forEach((i) => {
			if (i instanceof HTMLElement) {
				div.appendChild(i);
				return;
			}

			div.append(<RowItem {...i} />);
		});
	}
	return div;
}
