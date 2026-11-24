// Mostrado na hora do clique no menu, enquanto o servidor monta a página.
// Sem isso a tela fica parada até a página inteira chegar e o clique parece não ter pegado.
export default function CarregandoPainel() {
  return (
    <div className="flex flex-col gap-5 min-w-0 animate-pulse" aria-busy="true" aria-label="Carregando">
      <div className="pt-7 pb-6 px-5 lg:px-9 border-b border-[#E2DFD9]">
        <div className="h-3 w-16 rounded bg-[#E2DFD9]" />
        <div className="mt-2 h-7 w-56 rounded bg-[#E2DFD9]" />
      </div>
      <div className="flex flex-col gap-4 max-w-[820px] w-full px-5 lg:px-10">
        {[0, 1, 2].map(i => (
          <div key={i} className="h-28 rounded-xl border border-[#ECEAE5] bg-white" />
        ))}
      </div>
    </div>
  )
}
