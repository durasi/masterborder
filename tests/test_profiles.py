"""Country profile integrity tests."""
from backend.countries.profiles import COUNTRY_PROFILES
from backend.schemas.models import CountryCode


def test_all_supported_countries_have_profiles():
    """Every CountryCode enum value must have a matching profile entry."""
    for code in CountryCode:
        assert code.value in COUNTRY_PROFILES, f"Missing profile for {code}"


def test_profile_has_required_fields():
    """Each profile must have the fields the prompt builder reads."""
    for code, profile in COUNTRY_PROFILES.items():
        assert profile.code == code, f"{code}: profile.code mismatch"
        assert profile.name, f"{code}: empty name"
        assert profile.key_regulations, f"{code}: no key_regulations"
        assert profile.official_sources, f"{code}: no official_sources"


def test_profile_key_regulations_are_strings():
    """Regulations list must be plain strings for the prompt template."""
    for code, profile in COUNTRY_PROFILES.items():
        for reg in profile.key_regulations:
            assert isinstance(reg, str) and reg.strip(), (
                f"{code}: invalid regulation entry: {reg!r}"
            )


def test_profile_sanctions_regimes_defined():
    """Every profile defines at least one sanctions regime (even if 'None')."""
    for code, profile in COUNTRY_PROFILES.items():
        assert isinstance(profile.sanctions_regimes, list), (
            f"{code}: sanctions_regimes not a list"
        )


def test_five_countries_supported():
    """MasterBorder currently ships with five country profiles."""
    assert len(COUNTRY_PROFILES) == 5
    assert set(COUNTRY_PROFILES.keys()) == {"US", "DE", "GB", "TR", "JP"}
