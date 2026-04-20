// app/admin/inventory/reports/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface WeeklyData {
  week: number
  totalCost: number
  orders: number
}

interface MaterialSummary {
  material: string
  totalOrdered: number
  totalCost: number
  orders: number
}

interface ReportData {
  year: number
  month: number
  startDate: string
  endDate: string
  totalCost: number
  weekly: WeeklyData[]
  materials: MaterialSummary[]
  orders: any[]
}

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
]

export default function InventoryReportsPage() {
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)

  useEffect(() => {
    fetchReport()
  }, [selectedYear, selectedMonth])

  async function fetchReport() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(
        `/api/inventory/reports?year=${selectedYear}&month=${selectedMonth}`
      )
      if (!res.ok) throw new Error('Failed to fetch report')
      const data = await res.json()
      setReport(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const weekLabels: Record<number, string> = {
    1: 'Week 1 (1-7)',
    2: 'Week 2 (8-14)',
    3: 'Week 3 (15-21)',
    4: 'Week 4 (22-31)',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/inventory"
            className="text-[#5A6A7A] hover:text-[#0D1B2A] transition-colors"
          >
            ← Back
          </Link>
          <div>
            <h1 className="text-[#0D1B2A] font-black text-3xl mb-1">Inventory Reports</h1>
            <p className="text-[#5A6A7A] text-sm">
              Track material costs per week in a specific month
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-[#5A6A7A] mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
            >
              {[2024, 2025, 2026].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5A6A7A] mb-1">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
            >
              {MONTHS.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-[#5A6A7A]">Loading report...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      ) : report ? (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-4">
              <p className="text-[#5A6A7A] text-xs font-bold uppercase">Total Cost</p>
              <p className="text-[#0D1B2A] text-2xl font-black mt-1">
                R{report.totalCost.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-4">
              <p className="text-[#5A6A7A] text-xs font-bold uppercase">Total Orders</p>
              <p className="text-[#0D1B2A] text-2xl font-black mt-1">
                {report.orders?.length || 0}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-4">
              <p className="text-[#5A6A7A] text-xs font-bold uppercase">Date Range</p>
              <p className="text-[#0D1B2A] text-lg font-black mt-1">
                {new Date(report.startDate).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' })}
                {' - '}
                {new Date(report.endDate).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' })}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-4">
              <p className="text-[#5A6A7A] text-xs font-bold uppercase">Material Types</p>
              <p className="text-[#0D1B2A] text-2xl font-black mt-1">
                {report.materials?.length || 0}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 bg-[#F7F8FA] border-b border-[#E8EEF4]">
              <h2 className="font-bold text-[#0D1B2A]">Weekly Breakdown</h2>
            </div>
            <div className="grid grid-cols-4 gap-4 px-6 py-4">
              {report.weekly.map(w => (
                <div key={w.week} className="bg-[#F7F8FA] rounded-xl p-4">
                  <p className="text-[#5A6A7A] text-xs font-bold uppercase mb-2">
                    {weekLabels[w.week] || `Week ${w.week}`}
                  </p>
                  <p className="text-[#0D1B2A] text-xl font-black">
                    R{w.totalCost.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[#5A6A7A] text-xs mt-1">
                    {w.orders} order{w.orders !== 1 ? 's' : ''}
                  </p>
                </div>
              ))}
              {report.weekly.length === 0 && (
                <div className="col-span-4 text-center py-8 text-[#5A6A7A]">
                  No orders in this month
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 bg-[#F7F8FA] border-b border-[#E8EEF4]">
              <h2 className="font-bold text-[#0D1B2A]">Cost by Material Type</h2>
            </div>
            <div className="divide-y divide-[#E8EEF4]">
              {report.materials.map((m, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#0D1B2A]">{m.material}</p>
                    <p className="text-[#5A6A7A] text-xs">
                      {m.totalOrdered.toFixed(1)}m ordered • {m.orders} order{m.orders !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#0D1B2A]">
                      R{m.totalCost.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))}
              {report.materials.length === 0 && (
                <div className="px-6 py-8 text-center text-[#5A6A7A]">
                  No material costs this month
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-[#F7F8FA] border-b border-[#E8EEF4]">
              <h2 className="font-bold text-[#0D1B2A]">All Orders in {MONTHS.find(m => m.value === selectedMonth)?.label} {selectedYear}</h2>
            </div>
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#F7F8FA] border-b border-[#E8EEF4]">
              <div className="col-span-2 text-xs font-bold text-[#5A6A7A] uppercase">Date</div>
              <div className="col-span-3 text-xs font-bold text-[#5A6A7A] uppercase">Material</div>
              <div className="col-span-2 text-xs font-bold text-[#5A6A7A] uppercase">Qty</div>
              <div className="col-span-3 text-xs font-bold text-[#5A6A7A] uppercase">Manufacturer</div>
              <div className="col-span-2 text-xs font-bold text-[#5A6A7A] uppercase text-right">Total</div>
            </div>
            {(report.orders || []).length === 0 ? (
              <div className="text-center py-16 text-[#5A6A7A]">
                <p className="text-4xl mb-3">📋</p>
                <p className="font-bold">No orders found</p>
              </div>
            ) : (
              report.orders.map((order: any) => (
                <div
                  key={order.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#E8EEF4] hover:bg-[#FAFBFC] items-center"
                >
                  <div className="col-span-2">
                    <p className="text-[#0D1B2A] text-sm">
                      {new Date(order.order_date).toLocaleDateString('en-ZA')}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="font-bold text-[#0D1B2A] text-sm">{order.materials?.name}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[#0D1B2A] text-sm">{Number(order.quantity_ordered).toFixed(1)}m</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-[#5A6A7A] text-sm">{order.manufacturer || '-'}</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className="font-bold text-[#0D1B2A] text-sm">
                      R{Number(order.total_cost || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : null}
    </div>
  )
}