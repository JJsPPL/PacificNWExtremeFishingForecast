
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface RegulationsDisclaimerProps {
  state?: "WA" | "OR" | "ID" | "MT";
}

const regulationLinks = [
  {
    key: "WA" as const,
    label: "WDFW (Washington)",
    href: "https://wdfw.wa.gov/fishing/regulations",
  },
  {
    key: "OR" as const,
    label: "ODFW (Oregon)",
    href: "https://myodfw.com/articles/regulation-updates",
  },
  {
    key: "ID" as const,
    label: "IDFG (Idaho)",
    href: "https://idfg.idaho.gov/fish/rules",
  },
];

const RegulationsDisclaimer = ({ state }: RegulationsDisclaimerProps) => {
  return (
    <Alert
      className="border-amber-400/60 bg-amber-50/80 dark:bg-amber-950/30 dark:border-amber-500/40"
    >
      <AlertTriangle className="h-4 w-4 !text-amber-600 dark:!text-amber-400" />
      <AlertTitle className="text-amber-800 dark:text-amber-300">
        Always check current fishing regulations before heading out.
      </AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-400/90">
        <p className="mb-2">
          Rules change frequently. Verify season dates, catch limits, and gear
          restrictions with your state agency.
        </p>
        <div className="flex flex-wrap gap-3">
          {regulationLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline transition-colors",
                state === link.key
                  ? "text-amber-900 dark:text-amber-200 font-bold"
                  : "text-amber-700 dark:text-amber-400"
              )}
            >
              {link.label}
              <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default RegulationsDisclaimer;
