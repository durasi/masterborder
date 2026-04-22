"""Language name mapping for agent prompt directives.

Maps ISO 639-1 codes to English language names used in Opus 4.7 prompts.
Covers all 16 languages supported in MasterBorder UI (aligned with Isarud.com).
"""

LANGUAGE_NAMES: dict[str, str] = {
    "en": "English",
    "tr": "Turkish",
    "es": "Spanish",
    "fr": "French",
    "de": "German",
    "pt": "Portuguese",
    "ar": "Arabic",
    "zh": "Simplified Chinese",
    "ja": "Japanese",
    "ko": "Korean",
    "ru": "Russian",
    "it": "Italian",
    "nl": "Dutch",
    "hi": "Hindi",
    "id": "Indonesian",
    "pl": "Polish",
}


def get_language_name(code: str) -> str:
    """Return the English language name for an ISO 639-1 code. Falls back to English."""
    return LANGUAGE_NAMES.get(code, "English")
