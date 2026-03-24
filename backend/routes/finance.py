from fastapi import APIRouter
from models.schemas import TransactionIn
from services.financial_service import (
    get_transactions,
    add_transaction,
    summary_data,
    risk_data,
    insights_data,
    recommendation_data,
)

router = APIRouter()


@router.get('/transactions')
def transactions(category: str | None = None, search: str | None = None):
    return {"items": get_transactions(category, search)}


@router.post('/transactions')
def add(item: TransactionIn):
    return add_transaction(item)


@router.get('/summary')
def summary():
    return summary_data()


@router.get('/risk')
def risk():
    return risk_data()


@router.get('/insights')
def insights():
    return insights_data()


@router.get('/recommendations')
def recommendations():
    return recommendation_data()
