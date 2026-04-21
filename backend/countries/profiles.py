"""Country-specific compliance profiles for MasterBorder.

Each profile defines what a Country Agent should focus on for that jurisdiction:
- Official sources (government APIs, regulatory databases)
- Key regulations (REACH, Lacey Act, CITES, etc.)
- FTA eligibility (Turkey-specific trade agreements)
- Sanctions regimes applicable
- Unique concerns (Prop 65 for US, BTOM for UK, etc.)
"""

from dataclasses import dataclass, field


@dataclass(frozen=True)
class CountryProfile:
    """Configuration for a Country Agent."""

    code: str  # ISO 3166-1 alpha-2
    name: str
    official_sources: list[str] = field(default_factory=list)
    key_regulations: list[str] = field(default_factory=list)
    fta_with_turkey: str | None = None
    sanctions_regimes: list[str] = field(default_factory=list)
    unique_concerns: list[str] = field(default_factory=list)


COUNTRY_PROFILES: dict[str, CountryProfile] = {
    "US": CountryProfile(
        code="US",
        name="United States",
        official_sources=[
            "US Harmonized Tariff Schedule (HTS)",
            "OFAC SDN List (sanctions)",
            "CBP (Customs and Border Protection) rulings",
            "FDA (if food, cosmetics, medical)",
            "CPSC (consumer product safety)",
            "APHIS (animal/plant products)",
        ],
        key_regulations=[
            "19 CFR Part 134 (country of origin marking)",
            "Lacey Act (for wood/plant/animal products)",
            "FTC labeling rules (16 CFR Part 24 for leather)",
            "Section 301 tariffs (China-origin concerns)",
            "CBP Forced Labor enforcement (UFLPA)",
        ],
        fta_with_turkey=None,  # GSP historically suspended for Turkey
        sanctions_regimes=["OFAC SDN", "OFAC Sectoral Sanctions", "BIS Entity List"],
        unique_concerns=[
            "California Prop 65 warnings for chemicals",
            "Section 232/301 tariff exposure",
            "State-level labeling requirements",
        ],
    ),
    "DE": CountryProfile(
        code="DE",
        name="Germany (EU)",
        official_sources=[
            "EU TARIC database (tariffs)",
            "EU Sanctions Map",
            "ECHA REACH database (chemicals)",
            "CITES EU Wildlife Trade Regulations",
        ],
        key_regulations=[
            "EU REACH (Annex XVII chemical restrictions)",
            "EU Regulation 1907/2006 (chemicals)",
            "CE marking requirements",
            "EU-Turkey Customs Union (A.TR movement certificate)",
            "German Supply Chain Act (LkSG)",
            "EUDR (deforestation due diligence)",
        ],
        fta_with_turkey="EU-Turkey Customs Union (1995, A.TR certificate)",
        sanctions_regimes=["EU Consolidated List", "UN Security Council"],
        unique_concerns=[
            "Chromium VI limit in leather (≤3 mg/kg)",
            "Packaging waste obligations (VerpackG)",
            "Ecological design requirements",
        ],
    ),
    "GB": CountryProfile(
        code="GB",
        name="United Kingdom",
        official_sources=[
            "UK Global Tariff",
            "UK Sanctions List (OFSI)",
            "UK REACH database",
            "gov.uk trade regulations",
        ],
        key_regulations=[
            "UK REACH (post-Brexit mirror of EU REACH)",
            "UKCA marking",
            "UK-Turkey Free Trade Agreement (2021)",
            "Modern Slavery Act reporting",
            "Border Target Operating Model (BTOM)",
        ],
        fta_with_turkey="UK-Turkey FTA (2021, EUR.1 certificate)",
        sanctions_regimes=["OFSI UK Sanctions List", "UN Security Council"],
        unique_concerns=[
            "Post-Brexit dual documentation if routed via EU",
            "Consumer Protection from Unfair Trading Regulations",
            "Animal-origin SPS documentation under BTOM",
        ],
    ),
    "TR": CountryProfile(
        code="TR",
        name="Turkey",
        official_sources=[
            "Türkiye Gümrük Tarife Cetveli (TGTC)",
            "MASAK sanctions list",
            "Ticaret Bakanlığı ihracat mevzuatı",
        ],
        key_regulations=[
            "Turkish Customs Law No. 4458",
            "Export Regime Decree",
            "Inward/Outward Processing Regime",
            "Turkish REACH (KKDIK)",
        ],
        fta_with_turkey=None,  # Turkey itself
        sanctions_regimes=["MASAK", "UN Security Council"],
        unique_concerns=[
            "Dahilde İşleme Rejimi (inward processing) eligibility",
            "İhracat Genel Müdürlüğü approvals for sensitive goods",
            "E-invoice (e-Fatura/e-Arşiv) requirements",
        ],
    ),
    "JP": CountryProfile(
        code="JP",
        name="Japan",
        official_sources=[
            "Japan Customs Tariff Schedule",
            "METI Foreign Exchange and Foreign Trade Act list",
            "PMDA (if medical/cosmetics)",
            "Consumer Affairs Agency labeling rules",
        ],
        key_regulations=[
            "Foreign Exchange and Foreign Trade Act (FEFTA)",
            "Customs Tariff Law",
            "Industrial Safety and Health Act (chemicals)",
            "Household Goods Quality Labeling Act",
            "Japan-Turkey Economic Partnership Agreement (negotiations)",
        ],
        fta_with_turkey=None,  # Under negotiation as of 2026
        sanctions_regimes=["METI END-user list", "UN Security Council"],
        unique_concerns=[
            "JIS standards for quality marking",
            "Strict labeling in Japanese language",
            "Wassenaar Arrangement dual-use controls",
        ],
    ),
}


def get_profile(country_code: str) -> CountryProfile:
    """Retrieve a country profile by ISO code."""
    if country_code not in COUNTRY_PROFILES:
        raise ValueError(
            f"No profile for country '{country_code}'. "
            f"Supported: {list(COUNTRY_PROFILES.keys())}"
        )
    return COUNTRY_PROFILES[country_code]
