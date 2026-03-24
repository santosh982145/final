import random
from collections import defaultdict
from data.mock_data import generate_transactions, monthly_series

transactions_store = generate_transactions()


def get_transactions(category: str | None = None, search: str | None = None):
    items = transactions_store
    if category:
        items = [x for x in items if x["category"] == category]
    if search:
        items = [x for x in items if search.lower() in x["description"].lower()]
    return items


def add_transaction(item):
    new_item = item.model_dump()
    new_item["id"] = max([t["id"] for t in transactions_store], default=0) + 1
    transactions_store.insert(0, new_item)
    return new_item


def summary_data():
    trend = monthly_series()
    total_income = sum(t["amount"] for t in transactions_store if t["type"] == "income")
    total_expense = sum(t["amount"] for t in transactions_store if t["type"] == "expense")
    by_category = defaultdict(float)
    for t in transactions_store:
        if t["type"] == "expense":
            by_category[t["category"]] += t["amount"]
    category_distribution = [{"name": k, "value": round(v, 2)} for k, v in sorted(by_category.items(), key=lambda x: x[1], reverse=True)[:5]]
    risk_score = min(100, int((total_expense / (total_income + 1)) * 70 + random.randint(10, 35)))
    return {
        "total_balance": round(total_income - total_expense + 15000, 2),
        "income_expense_trend": trend,
        "category_distribution": category_distribution,
        "risk_score": risk_score,
        "insights": [
            "Discretionary spending increased 8% month-over-month.",
            "Liquidity remains stable for the next 3 months.",
            "Dining + Shopping contribute to 31% of expenses."
        ]
    }


def risk_data():
    indicators = {
        "ratio": random.randint(25, 80),
        "volatility": random.randint(30, 85),
        "liquidity": random.randint(20, 78),
    }
    score = int(sum(indicators.values()) / 3)
    level = "Low" if score < 40 else "Medium" if score < 70 else "High"
    monthly_breakdown = [
        {"month": "Oct", "ratio": 20, "volatility": 25, "liquidity": 15},
        {"month": "Nov", "ratio": 24, "volatility": 23, "liquidity": 12},
        {"month": "Dec", "ratio": 26, "volatility": 28, "liquidity": 15},
        {"month": "Jan", "ratio": 18, "volatility": 35, "liquidity": 19},
        {"month": "Feb", "ratio": 22, "volatility": 31, "liquidity": 17},
        {"month": "Mar", "ratio": 20, "volatility": 30, "liquidity": 21},
    ]
    return {"score": score, "level": level, "indicators": indicators, "monthly_breakdown": monthly_breakdown}


def insights_data():
    return {
        "monthly_comparison": [{"month": m, "spend": s} for m, s in [("Oct", 2600), ("Nov", 2730), ("Dec", 3200), ("Jan", 2980), ("Feb", 2810), ("Mar", 3045)]],
        "volatility": [{"month": m, "index": i} for m, i in [("Oct", 32), ("Nov", 34), ("Dec", 49), ("Jan", 41), ("Feb", 38), ("Mar", 44)]],
        "notes": ["Expense volatility spiked in December due to seasonal shopping.", "March shows moderate stabilization."]
    }


def recommendation_data():
    return {
        "items": [
            {"icon": "💸", "title": "Reduce discretionary spending", "detail": "Dining and shopping exceed your target threshold by 12%.", "priority": "High"},
            {"icon": "🛟", "title": "Increase savings buffer", "detail": "Current emergency buffer covers 2.5 months; target is 6 months.", "priority": "Medium"},
            {"icon": "📈", "title": "Automate monthly investment", "detail": "Set up an SIP-style recurring transfer of 10% monthly surplus.", "priority": "Medium"}
        ]
    }
