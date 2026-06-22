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
            Why Bowlz beats traditional glass
          </h2>
        </AnimateIn>
        <AnimateIn delay={1}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] overflow-hidden rounded-[20px] bg-white text-[0.9375rem] shadow-[0_2px_8px_rgba(138,44,77,0.06)]">
              <thead>
                <tr className="bg-plum text-white">
                  <th className="p-4 text-left font-semibold"></th>
                  <th className="p-4 font-semibold">Bowlz</th>
                  <th className="p-4 font-semibold">Glass bowls</th>
                  <th className="p-4 font-semibold">Silicone</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-plum/10 last:border-0">
                    <td className="p-4 font-medium text-taupe-dark">{row.feature}</td>
                    <td className="p-4 text-center"><Cell value={row.bowlz} /></td>
                    <td className="p-4 text-center"><Cell value={row.glass} /></td>
                    <td className="p-4 text-center"><Cell value={row.silicone} /></td>
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
