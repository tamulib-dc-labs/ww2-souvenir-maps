import { CanopyEnvironment, CanopyLocale } from "@customTypes/canopy";
import { getDefaultLang, getLocale } from "@hooks/useLocale";

export async function getConfigAndLocale() {
  const config = process.env.CANOPY_CONFIG as unknown as CanopyEnvironment;
  const { locales } = config;

  const defaultLang = getDefaultLang(locales);
  const defaultLocale = await getLocale(locales, defaultLang);

  return {
    config,
    locales,
    locale: defaultLocale as CanopyLocale,
  };
}