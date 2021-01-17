"""Wrote the graphql query without manually going one-by-one to enter each."""
import os

organizers = [o for o in os.listdir() if o.endswith(".jpg")]
for name in sorted(organizers):
    print(
        f'    {name[:-len(".jpg")]}Org: file(relativePath: {{ eq: "organizers/{name}" }}) {{',
        "  ...OrganizerImage",
        "}",
        sep="\n    ",
    )

