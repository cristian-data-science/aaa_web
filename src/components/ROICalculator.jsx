import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, Clock, DollarSign, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    employees: 10,
    hourlyRate: 15,
    hoursPerTask: 2,
    tasksPerWeek: 20,
    errorRate: 5
  })

  const [results, setResults] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }))
  }

  const calculateROI = () => {
    setIsCalculating(true)
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const { employees, hourlyRate, hoursPerTask, tasksPerWeek, errorRate } = formData
      
      // Current costs calculation
      const weeklyHours = employees * hoursPerTask * tasksPerWeek
      const weeklyCost = weeklyHours * hourlyRate
      const annualCost = weeklyCost * 52
      
      // Error costs (assuming errors cost 2x the original task time)
      const errorCostMultiplier = errorRate / 100 * 2
      const annualErrorCost = annualCost * errorCostMultiplier
      
      const totalCurrentCost = annualCost + annualErrorCost
      
      // Automation benefits (assuming 70% time reduction and 95% error reduction)
      const timeReduction = 0.70
      const errorReduction = 0.95
      
      const savedLaborCost = annualCost * timeReduction
      const savedErrorCost = annualErrorCost * errorReduction
      const totalSavings = savedLaborCost + savedErrorCost
      
      // Simple automation investment estimate (based on complexity)
      const automationInvestment = Math.max(25000, weeklyHours * 100)
      
      // ROI calculation
      const netBenefit = totalSavings - automationInvestment
      const roiPercentage = (netBenefit / automationInvestment) * 100
      const paybackMonths = automationInvestment / (totalSavings / 12)
      
      setResults({
        currentAnnualCost: totalCurrentCost,
        automationInvestment,
        annualSavings: totalSavings,
        netBenefit,
        roiPercentage,
        paybackMonths,
        timeReduction: timeReduction * 100,
        errorReduction: errorReduction * 100
      })
      
      setIsCalculating(false)
    }, 1500)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section id="roi-calculator" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 35}%`,
              top: `${10 + i * 25}%`,
              width: `${120 + i * 30}px`,
              height: `${120 + i * 30}px`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="w-full h-full opacity-10"
              style={{
                background: `conic-gradient(from 0deg, transparent, rgba(52, 211, 153, 0.35), transparent)`,
                borderRadius: '50%',
                filter: 'blur(30px)',
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100/80 to-emerald-300/60 backdrop-blur-sm rounded-full px-6 py-2 border border-emerald-200/60 mb-6"
            
            transition={{ duration: 0.2 }}
          >
            <Calculator className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-900">Calculadora de ROI</span>
          </motion.div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-emerald-950"
            style={{
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
            }}
          >
            Calculadora de ROI
          </h2>
          
          <p className="text-xl text-emerald-800 max-w-3xl mx-auto font-medium">
            Descubre el potencial de ahorro y retorno de inversión que la automatización inteligente puede generar en tu empresa.
          </p>
        </motion.div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Input Form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="gradient-border-wrapper rounded-3xl">
              <div className="bg-white/98 backdrop-blur-xl rounded-3xl p-8 transition-all duration-500 shadow-lg">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-200 to-emerald-500 p-3 mr-4">
                  <Users className="w-full h-full text-emerald-950" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-950">Datos de tu Empresa</h3>
              </div>

              <div className="space-y-6">
                {/* Employees */}
                <div>
                  <label className="block text-emerald-800 text-sm font-medium mb-2">
                    Número de empleados en procesos manuales
                  </label>
                  <input
                    type="number"
                    value={formData.employees}
                    onChange={(e) => handleInputChange('employees', e.target.value)}
                    className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 text-emerald-900 placeholder-emerald-400/70 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 transition-all duration-300"
                    min="1"
                  />
                </div>

                {/* Hourly Rate */}
                <div>
                  <label className="block text-emerald-700 text-sm font-medium mb-2">
                    Salario promedio por hora (USD)
                  </label>
                  <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 text-emerald-900 placeholder-emerald-400/70 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 transition-all duration-300"
                    min="1"
                    step="0.5"
                  />
                </div>

                {/* Hours per Task */}
                <div>
                  <label className="block text-emerald-700 text-sm font-medium mb-2">
                    Horas por tarea manual
                  </label>
                  <input
                    type="number"
                    value={formData.hoursPerTask}
                    onChange={(e) => handleInputChange('hoursPerTask', e.target.value)}
                    className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 text-emerald-900 placeholder-emerald-400/70 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 transition-all duration-300"
                    min="0.1"
                    step="0.1"
                  />
                </div>

                {/* Tasks per Week */}
                <div>
                  <label className="block text-emerald-700 text-sm font-medium mb-2">
                    Tareas por semana
                  </label>
                  <input
                    type="number"
                    value={formData.tasksPerWeek}
                    onChange={(e) => handleInputChange('tasksPerWeek', e.target.value)}
                    className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 text-emerald-900 placeholder-emerald-400/70 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 transition-all duration-300"
                    min="1"
                  />
                </div>

                {/* Error Rate */}
                <div>
                  <label className="block text-emerald-700 text-sm font-medium mb-2">
                    Tasa de errores actual (%)
                  </label>
                  <input
                    type="number"
                    value={formData.errorRate}
                    onChange={(e) => handleInputChange('errorRate', e.target.value)}
                    className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 text-emerald-900 placeholder-emerald-400/70 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 transition-all duration-300"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>

                {/* Calculate Button */}
                <motion.div
                  className="pt-4"
                  
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={calculateROI}
                    disabled={isCalculating}
                    className="w-full bg-gradient-to-r from-emerald-100 via-emerald-300 to-emerald-500 hover:from-emerald-200 hover:to-emerald-600 text-emerald-950 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    {isCalculating ? (
                      <motion.div
                        className="flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Calculator className="w-5 h-5 mr-2" />
                        Calculando...
                      </motion.div>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Calculator className="w-5 h-5 mr-2" />
                        Calcular ROI
                      </span>
                    )}
                  </Button>
                </motion.div>
              </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="gradient-border-wrapper rounded-3xl h-full">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 transition-all duration-500 h-full">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-200 to-emerald-500 p-3 mr-4">
                  <TrendingUp className="w-full h-full text-emerald-950" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900">Resultados del Análisis</h3>
              </div>

              {!results ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-100 to-emerald-300 p-5 mb-4">
                    <Calculator className="w-full h-full text-emerald-900" />
                  </div>
                  <p className="text-emerald-700 text-lg">
                    Completa los datos de tu empresa para ver el análisis de ROI personalizado.
                  </p>
                </div>
              ) : (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* ROI Percentage */}
                  <div className="text-center p-6 bg-gradient-to-r from-emerald-100/70 via-emerald-200/60 to-emerald-300/60 rounded-2xl border border-emerald-300/50">
                    <motion.div
                      className="text-4xl font-black text-emerald-600 mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {results.roiPercentage > 0 ? '+' : ''}{results.roiPercentage.toFixed(0)}%
                    </motion.div>
                    <p className="text-emerald-700 font-semibold">ROI Anual</p>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-100">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">
                        {formatCurrency(results.annualSavings)}
                      </div>
                      <p className="text-emerald-700 text-sm">Ahorro Anual</p>
                    </div>
                    
                    <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-100">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">
                        {results.paybackMonths.toFixed(1)} meses
                      </div>
                      <p className="text-emerald-700 text-sm">Recuperación</p>
                    </div>
                    
                    <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-100">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">
                        {results.timeReduction.toFixed(0)}%
                      </div>
                      <p className="text-emerald-700 text-sm">Reducción Tiempo</p>
                    </div>
                    
                    <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-100">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">
                        {results.errorReduction.toFixed(0)}%
                      </div>
                      <p className="text-emerald-700 text-sm">Reducción Errores</p>
                    </div>
                  </div>

                  {/* Investment Details */}
                  <div className="space-y-3 pt-4 border-t border-emerald-100">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-700">Costo actual anual:</span>
                      <span className="text-emerald-900 font-semibold">{formatCurrency(results.currentAnnualCost)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-700">Inversión estimada:</span>
                      <span className="text-emerald-900 font-semibold">{formatCurrency(results.automationInvestment)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-700">Beneficio neto anual:</span>
                      <span className="text-emerald-600 font-bold">{formatCurrency(results.netBenefit)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ROICalculator
