from django.core.management.base import BaseCommand
from django.db import transaction

from apps.company.models import CompanyProfile, SocialLink


PROFILE_VALUES = {
    "company_name": "MK Garments",
    "tagline": "A trusted garment factory specializing in high-quality customized garments.",
    "address": "Pokhara, Nepal",
    "phone": "+977 980-5809353",
    "email": "mkgarments.co@gmail.com",
    "default_seo_title": "MK Garments | Garment Manufacturer in Pokhara, Nepal",
    "default_seo_description": "MK Garments is a garment manufacturer in Pokhara, Nepal, specializing in high-quality customized garments.",
}

SOCIAL_LINKS = (
    {
        "platform": "Facebook",
        "url": "https://www.facebook.com/mkgarmentsco",
        "icon_name": "facebook",
        "order": 1,
    },
    {
        "platform": "Instagram",
        "url": "https://www.instagram.com/mkgarments.co",
        "icon_name": "instagram",
        "order": 2,
    },
)


class Command(BaseCommand):
    help = "Seed the MK Garments company profile and social links."

    def add_arguments(self, parser):
        parser.add_argument(
            "--force",
            action="store_true",
            help="Overwrite existing profile values and social link URLs.",
        )

    def handle(self, *args, **options):
        force = options["force"]
        set_fields = []
        untouched_fields = []
        social_summary = []

        with transaction.atomic():
            profile = CompanyProfile.objects.first()
            profile_created = profile is None
            if profile_created:
                profile = CompanyProfile()

            for field, value in PROFILE_VALUES.items():
                current_value = getattr(profile, field, "")
                if profile_created or force or not current_value:
                    setattr(profile, field, value)
                    set_fields.append(field)
                else:
                    untouched_fields.append(field)
            profile.save()

            for link_values in SOCIAL_LINKS:
                link = SocialLink.objects.filter(
                    platform__iexact=link_values["platform"]
                ).first()
                if link is None:
                    SocialLink.objects.create(
                        **link_values,
                        is_active=True,
                    )
                    social_summary.append(
                        f'{link_values["platform"]}: created'
                    )
                    continue

                if force:
                    link.url = link_values["url"]
                link.platform = link_values["platform"]
                link.icon_name = link_values["icon_name"]
                link.order = link_values["order"]
                link.is_active = True
                link.save(update_fields=["platform", "url", "icon_name", "order", "is_active"])
                url_status = "URL updated" if force else "URL left untouched"
                social_summary.append(
                    f'{link_values["platform"]}: already existed ({url_status})'
                )

        profile_status = "created" if profile_created else "already existed"
        self.stdout.write(self.style.SUCCESS(f"Company profile {profile_status}."))
        self.stdout.write(
            self.style.SUCCESS(
                "Profile fields set: "
                + (", ".join(set_fields) if set_fields else "none")
            )
        )
        self.stdout.write(
            self.style.SUCCESS(
                "Profile fields left untouched: "
                + (", ".join(untouched_fields) if untouched_fields else "none")
            )
        )
        self.stdout.write(self.style.SUCCESS("Social links:"))
        for summary in social_summary:
            self.stdout.write(self.style.SUCCESS(f"  - {summary}"))
