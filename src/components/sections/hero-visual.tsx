import { BrowserFrame } from "@/components/ui/browser-frame";
import { MobileScreen, WebsitePreview } from "@/components/ui/website-preview";

/*
 * Hero illustration: a desktop browser with a phone overlapping its lower
 * right corner — the same website on both screens, to say "responsive".
 *
 * Sizes use container query units (cqw = 1% of this illustration's width),
 * so the proportions stay identical from a small phone to a wide desktop.
 * The padding on the inner wrapper reserves the space the phone sticks out
 * into, so nothing ever extends past the column.
 */
export function HeroVisual() {
  return (
    <div aria-hidden="true" className="w-full select-none @container sm:max-w-xl">
      <div className="relative pr-[8cqw] pb-[16cqw]">
        <BrowserFrame url="yourbusiness.com">
          <div className="relative aspect-[16/10]">
            <WebsitePreview variant="split" />
          </div>
        </BrowserFrame>
        <div className="absolute right-0 bottom-0 aspect-[9/19] w-[26cqw] overflow-hidden rounded-[4.5cqw] border-[length:1cqw] border-ink bg-surface shadow-frame">
          <MobileScreen />
        </div>
      </div>
    </div>
  );
}
