import { Price } from './price'
import { decimal } from '@sypos/decimal.js';

type PriceRule = {
  minimumQuantity: number
  maximumQuantity: number | null
  adjustmentPerUnit: decimal
  isIncrease: boolean
  applyToTotal?: boolean
}

type Discount = {
  type: 'fixed' | 'percentage'
  value: number
  applyToBaseTotalPrice: boolean
}

type CalculationResult = {
  baseTotal: decimal
  finalTotal: decimal
  appliedDiscounts: Array<{
    type: 'fixed' | 'percentage'
    amount: decimal
  }>
}

type FormattedDiscount = {
  type: 'fixed' | 'percentage'
  amount: string
}

interface ISalePriceCalculator {
  calculate(quantity: number, discounts?: Discount[]): CalculationResult
  getFormattedBaseTotal(): string
  getFormattedFinalTotal(): string
  getFormattedDiscounts(): FormattedDiscount[]
}

export class SalePriceCalculator implements ISalePriceCalculator {
  private basePrice: Price
  private rules: PriceRule[]
  private minimumSaleValue: Price
  private lastCalculation: CalculationResult | null = null

  constructor(basePrice: number, rules?: PriceRule[], minimumSaleValue = 0) {
    this.validateInputs(basePrice, rules || [], minimumSaleValue)
    this.basePrice = new Price(basePrice)
    this.rules = rules || []
    this.minimumSaleValue = new Price(minimumSaleValue)
  }

  private validateInputs(
    basePrice: number,
    rules: PriceRule[],
    minimumSaleValue: number
  ): void {
    if (basePrice <= 0) {
      throw new Error('Base price must be greater than zero')
    }

    if (minimumSaleValue < 0) {
      throw new Error('Minimum sale value cannot be negative')
    }

    if (minimumSaleValue > basePrice) {
      throw new Error('Minimum sale value cannot be greater than base price')
    }

    rules.forEach((rule, index) => {
      if (rule.minimumQuantity <= 0) {
        throw new Error(
          `Rule ${index}: Minimum quantity must be greater than zero`
        )
      }
      if (rule.adjustmentPerUnit < new Price(0).value) {
        throw new Error(
          `Rule ${index}: Adjustment per unit must be greater than zero`
        )
      }
      if (
        rule.maximumQuantity !== null &&
        rule.maximumQuantity <= rule.minimumQuantity
      ) {
        throw new Error(
          `Rule ${index}: Maximum quantity must be greater than minimum quantity`
        )
      }
    })
  }

  private calculateBaseTotal(quantity: number): Price {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than zero')
    }

    const baseTotal = this.basePrice.multiply(quantity)

    if (this.rules.length === 0) {
      return baseTotal
    }

    const applicableRule = this.rules.find(
      (rule) =>
        quantity >= rule.minimumQuantity &&
        (rule.maximumQuantity === null || quantity <= rule.maximumQuantity)
    )

    if (!applicableRule) {
      return baseTotal
    }

    if (applicableRule.applyToTotal) {
      const adjustment = new Price(applicableRule.adjustmentPerUnit).value.mul(
        quantity
      )
      return applicableRule.isIncrease
        ? baseTotal.add(new Price(adjustment))
        : baseTotal.subtract(new Price(adjustment))
    }

    const startCountingFrom =
      applicableRule.minimumQuantity === 2
        ? 1
        : applicableRule.minimumQuantity - 1

    const extraUnits = quantity - startCountingFrom
    const adjustment = new Price(applicableRule.adjustmentPerUnit).multiply(
      extraUnits
    )

    return applicableRule.isIncrease
      ? this.basePrice.add(adjustment)
      : this.basePrice.subtract(adjustment)
  }

  calculate(quantity: number, discounts?: Discount[]): CalculationResult {
    const baseTotal = this.calculateBaseTotal(quantity)
    let currentTotal = baseTotal
    const appliedDiscounts: Array<{
      type: 'fixed' | 'percentage'
      amount: decimal
    }> = []

    if (discounts && discounts.length > 0) {
      const sortedDiscounts = [...discounts].sort((a, b) =>
        a.applyToBaseTotalPrice === b.applyToBaseTotalPrice
          ? 0
          : a.applyToBaseTotalPrice
            ? -1
            : 1
      )

      for (const discount of sortedDiscounts) {
        if (discount.value < 0) {
          throw new Error('Discount value must be a positive value')
        }

        if (discount.type === 'percentage' && discount.value > 100) {
          throw new Error('Percentage discount cannot exceed 100%')
        }

        const targetValue = discount.applyToBaseTotalPrice
          ? baseTotal
          : currentTotal

        if (discount.type === 'fixed') {
          const discountAmount = new Price(discount.value)
          currentTotal = currentTotal.subtract(discountAmount)
          appliedDiscounts.push({ type: 'fixed', amount: discountAmount.value })
        } else {
          const discountAmount = targetValue
            .multiply(discount.value)
            .divide(100)
          currentTotal = currentTotal.subtract(discountAmount)
          appliedDiscounts.push({
            type: 'percentage',
            amount: discountAmount.value
          })
        }
      }
    }

    currentTotal = currentTotal.max(this.minimumSaleValue)

    this.lastCalculation = {
      baseTotal: baseTotal.value,
      finalTotal: currentTotal.value,
      appliedDiscounts
    }

    return this.lastCalculation
  }

  getFormattedBaseTotal(): string {
    if (!this.lastCalculation) {
      throw new Error('No calculation has been performed yet')
    }
    return this.lastCalculation.baseTotal.toString()
  }

  getFormattedFinalTotal(): string {
    if (!this.lastCalculation) {
      throw new Error('No calculation has been performed yet')
    }
    return this.lastCalculation.finalTotal.toString()
  }

  getFormattedDiscounts(): FormattedDiscount[] {
    if (!this.lastCalculation) {
      throw new Error('No calculation has been performed yet')
    }
    return this.lastCalculation.appliedDiscounts.map((d) => ({
      type: d.type,
      amount: d.amount.toString()
    }))
  }
}
