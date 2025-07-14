import { useCallback } from "react";
import { HistoryItem } from "../types/history";

const STORAGE_KEY = "consult_history";

function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function useConsultHistory() {
  // 履歴を取得
  const fetchHistory = useCallback((): HistoryItem[] => {
    return getHistory();
  }, []);

  // 履歴を追加
  const addHistory = useCallback((item: HistoryItem) => {
    const history = getHistory();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...history]));
  }, []);

  // 履歴を全削除
  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { fetchHistory, addHistory, clearHistory };
} 