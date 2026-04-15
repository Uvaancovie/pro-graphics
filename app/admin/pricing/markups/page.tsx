// app/admin/pricing/markups/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const CATEGORIES = [
  { id: 'vehicle-branding', name: '🚗 Vehicle Branding' },
  { id: 'sign-boards', name: '📋 Sign Boards' },
  { id: 'contravisions', name: '🪟 Contravisions' },
  { id: 'stickers', name: '✂️ Stickers' },
  { id: 'promotional', name: '🎁 Promotional' },
  { id: 'banners', name: '🚩 Banners' },
]

export default async function PricingMarkupsPage() {
  const supabase = await createSupabaseServerClient()

  const { data: markups } = await supabase
    .from('pricing_markups')
    .select('*')
    .eq('is_active', true)
    .order('category')

  async function updateMarkup(formData: FormData) {
    'use server'
    const supabase = await createSupabaseServerClient()

    const id = formData.get('id') as string
    const markupValue = parseFloat(formData.get('markup_value') as string)
    const markupType = formData.get('markup_type') as string

    await supabase
      .from('pricing_markups')
      .update({ markup_value: markupValue, markup_type: markupType })
      .eq('id', id)

    revalidatePath('/admin/pricing/markups')
  }

  async function createMarkup(formData: FormData) {
    'use server'
    const supabase = await createSupabaseServerClient()

    const category = formData.get('category') as string
    const markupValue = parseFloat(formData.get('markup_value') as string)
    const markupType = formData.get('markup_type') as string
    const costBasis = formData.get('cost_basis') as string

    await supabase.from('pricing_markups').insert({
      category,
      markup_type: markupType,
      markup_value: markupValue,
      cost_basis: costBasis,
      is_active: true,
    })

    revalidatePath('/admin/pricing/markups')
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#0D1B2A] font-black text-3xl mb-1">Pricing Markups</h1>
        <p className="text-[#5A6A7A] text-sm">
          Configure markup percentages to automatically calculate customer prices from base costs
        </p>
      </div>

      {/* Explanation card */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
        <h2 className="font-bold text-blue-900 mb-2">How Markups Work</h2>
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <p className="font-medium text-blue-800 mb-1">1. Base Cost</p>
            <p className="text-blue-700">Your material + labor cost for the job</p>
          </div>
          <div>
            <p className="font-medium text-blue-800 mb-1">2. Apply Markup</p>
            <p className="text-blue-700">Markup % is added to determine selling price</p>
          </div>
          <div>
            <p className="font-medium text-blue-800 mb-1">3. Customer Price</p>
            <p className="text-blue-700">Final price shown to customer with VAT</p>
          </div>
        </div>
      </div>

      {/* Markups grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {CATEGORIES.map((cat) => {
          const markup = markups?.find((m: any) => m.category === cat.id)

          return (
            <div key={cat.id} className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#0D1B2A]">{cat.name}</h3>
                {markup ? (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                    Active
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs font-bold">
                    Not Set
                  </span>
                )}
              </div>

              {markup ? (
                <form action={updateMarkup} className="space-y-4">
                  <input type="hidden" name="id" value={markup.id} />
                  <div>
                    <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                      Markup Percentage
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        name="markup_value"
                        min="0"
                        max="200"
                        step="0.1"
                        defaultValue={markup.markup_value}
                        className="w-32 border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                      />
                      <span className="text-[#5A6A7A]">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                      Cost Basis
                    </label>
                    <select
                      name="cost_basis"
                      defaultValue={markup.cost_basis}
                      disabled
                      className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm bg-gray-50"
                    >
                      <option value="material_only">Material Cost Only</option>
                      <option value="material_labor">Material + Labor</option>
                      <option value="wholesale">Wholesale Price</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#FF6B35] hover:bg-[#e85c28] text-white font-bold
                                 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Update Markup
                    </button>
                  </div>
                </form>
              ) : (
                <form action={createMarkup} className="space-y-4">
                  <input type="hidden" name="category" value={cat.id} />
                  <div>
                    <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                      Markup Percentage
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        name="markup_value"
                        min="0"
                        max="200"
                        step="0.1"
                        defaultValue="30"
                        className="w-32 border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                      />
                      <span className="text-[#5A6A7A]">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                      Cost Basis
                    </label>
                    <select
                      name="cost_basis"
                      className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="material_labor">Material + Labor</option>
                      <option value="material_only">Material Cost Only</option>
                      <option value="wholesale">Wholesale Price</option>
                    </select>
                  </div>

                  <input type="hidden" name="markup_type" value="percentage" />

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#FF6B35] hover:bg-[#e85c28] text-white font-bold
                                 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Create Markup
                    </button>
                  </div>
                </form>
              )}
            </div>
          )
        })}
      </div>

      {/* Quick calculator */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
        <h2 className="font-bold text-[#0D1B2A] mb-4">Quick Price Calculator</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#5A6A7A] mb-1">Category</label>
            <select
              id="calc-category"
              className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5A6A7A] mb-1">Base Cost (R)</label>
            <input
              id="calc-cost"
              type="number"
              min="0"
              step="0.01"
              className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
              placeholder="1000.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5A6A7A] mb-1">Markup %</label>
            <input
              id="calc-markup"
              type="number"
              min="0"
              step="0.1"
              defaultValue="30"
              className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5A6A7A] mb-1">Customer Price (incl. VAT)</label>
            <div className="flex items-center gap-2">
              <input
                id="calc-result"
                type="text"
                readOnly
                className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm bg-gray-50 font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        function calculatePrice() {
          const cost = parseFloat(document.getElementById('calc-cost').value) || 0;
          const markup = parseFloat(document.getElementById('calc-markup').value) || 0;
          const subtotal = cost * (1 + markup / 100);
          const total = subtotal * 1.15; // Add 15% VAT
          document.getElementById('calc-result').value = 'R' + total.toFixed(2);
        }
        document.getElementById('calc-cost').addEventListener('input', calculatePrice);
        document.getElementById('calc-markup').addEventListener('input', calculatePrice);
      ` }} />
    </div>
  )
}
