from datetime import date, timedelta
import random

CATEGORIES = ["Groceries", "Rent", "Transport", "Dining", "Utilities", "Salary", "Investments", "Healthcare", "Shopping"]


def generate_transactions(n: int = 40):
    today = date.today()
    items = []
    for i in range(n):
        tx_date = today - timedelta(days=random.randint(0, 120))
        cat = random.choice(CATEGORIES)
        t_type = "income" if cat in ["Salary", "Investments"] and random.random() > 0.3 else "expense"
        amount = round(random.uniform(30, 3500 if t_type == "income" else 600), 2)
        items.append({
            "id": i + 1,
            "date": tx_date.isoformat(),
            "description": f"{cat} transaction",
            "category": cat,
            "type": t_type,
            "amount": amount,
        })
    return sorted(items, key=lambda x: x["date"], reverse=True)


def monthly_series():
    months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
    trend = []
    for m in months:
        income = random.randint(4200, 6100)
        expense = random.randint(2600, 4700)
        trend.append({"month": m, "income": income, "expense": expense})
    return trend
