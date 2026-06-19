import { comparisonRows } from "@/data/content";
import { AnimateIn } from "@/components/ui/AnimateIn";

function Cell({ value }: { value: boolean }) {
  if (value) return <span className="font-bold text-green-600">✓</span>;
  return <span className="text-caption">—</span>;
}

export function Comparison() {
  return (
    <section className="section section-alt">
      <div className="container-main">
        <AnimateIn>
          <h2 className="mb-8 text-center text-[clamp(1.75rem,4vw,2.5rem)]">
            Why women switch to Nova Triggers
          </h2>
        </AnimateIn>
        <AnimateIn delay={1}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] overflow-hidden rounded-[20px] bg-white text-[0.9375rem] shadow-[0_2px_8px_rgba(91,42,71,0.06)]">
              <thead>
                <tr className="bg-plum text-white">
                  <th className="p-4 text-left font-semibold"></th>
                  <th className="p-4 font-semibold">Nova Triggers</th>
                  <th className="p-4 font-semibold">Pain pills</th>
                  <th className="p-4 font-semibold">Hot water bottle</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-plum/10 last:border-0">
                    <td className="p-4 font-medium text-taupe-dark">{row.feature}</td>
                    <td className="p-4 text-center"><Cell value={row.nova} /></td>
                    <td className="p-4 text-center"><Cell value={row.pills} /></td>
                    <td className="p-4 text-center"><Cell value={row.bottle} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
