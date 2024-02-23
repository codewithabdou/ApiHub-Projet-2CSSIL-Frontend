"use client";

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@navigation";

export function ToggleLanguage() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const handleLocaleChange = (locale: string) => {
    router.replace(pathname, { locale: locale });
  };
  return (
    <ToggleGroup defaultValue={locale} type="single">
      <ToggleGroupItem
        onClick={() => handleLocaleChange("ar")}
        value="ar"
        aria-label="Toggle ar"
      >
        Ar
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={() => handleLocaleChange("fr")}
        value="fr"
        aria-label="Toggle fr"
      >
        Fr
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={() => handleLocaleChange("en")}
        value="en"
        aria-label="Toggle en"
      >
        En
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
