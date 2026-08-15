const SUPPORTED_LOCALES = ['en', 'zh'];
const FALLBACK_LOCALE = SUPPORTED_LOCALES[0];
export const LOCALE_STORAGE_KEY = 'preferred-locale';

const resolveLocale = (locale) => {
	// We strip region specific localization (cuz i aint doing that cuhh)
	const language = locale.split('-')[0];

	if (SUPPORTED_LOCALES.includes(language)) {
		return language;
	} else {
		return FALLBACK_LOCALE;
	}
};

// gets the property from an object with a key that is a string that is delimited with a .
const getValue = (object, path) => {
	return path.split('.').reduce((current, key) => current?.[key], object);
};

let t = (key) => {
	return undefined;
};

const i18nInit = async () => {
	// We first retrieve and resolve locale preference file..
	const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
	const localePreference = savedLocale ?? navigator.language;

	try {
		const response = await fetch(`locale/${resolveLocale(localePreference)}.json`);
		if (!response.ok) throw new Error('Network error');

		const locale = await response.json();
		t = (key) => {
			return getValue(locale, key);
		};
	} catch (error) {
		console.error('Fetching of localization failed:', error);
	}
};

const appendTextWithNewLines = (element, text) => {
	const lines = text.split('\n');

	lines.forEach((line, index) => {
		if (index > 0) {
			element.append(document.createElement('br'));
		}

		element.append(document.createTextNode(line));
	});
};

export const translatePage = async () => {
	await i18nInit();

	document.querySelectorAll('[data-i18n]').forEach((element) => {
		const key = element.dataset.i18n;
		const template = t(key);

		if (!template) {
			console.error(`Failed to find localized text for ${key}`);
			return;
		}

		// Collect slots BEFORE clearing the element.
		const slots = new Map();

		element.querySelectorAll('[data-i18n-slot]').forEach((slot) => {
			slots.set(slot.dataset.i18nSlot, slot);
		});

		// Now it's safe to remove the original contents.
		element.replaceChildren();

		const regex = /<(\w+)>(.*?)<\/\1>/g;

		let lastIndex = 0;

		for (const match of template.matchAll(regex)) {
			const [fullMatch, slotName, content] = match;
			const index = match.index;

			// Text before the slot
			appendTextWithNewLines(element, template.slice(lastIndex, index));

			// Retrieve the original element
			const slot = slots.get(slotName);

			if (!slot) {
				console.warn(`Missing i18n slot: ${slotName}`);
				element.append(document.createTextNode(content));
			} else {
				slot.textContent = content;
				element.append(slot);
			}

			lastIndex = index + fullMatch.length;
		}

		// Remaining text
		appendTextWithNewLines(element, template.slice(lastIndex));
	});
};
