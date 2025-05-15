from typing import Dict, List

class GraphQueryTool:
    def __init__(self, driver):
        self.driver = driver
    
    def neighborhoods(self, slots: Dict) -> List[Dict]:
        budget = int(slots.get('budget', 99999999))
        workplace = slots.get('workplace', '')
        cypher = (
            "MATCH (a:Region) "
            "WHERE a.avg_rent <= $budget AND a.address CONTAINS $workplace "
            "RETURN a.address AS area, a.avg_rent AS rent, a.avg_deposit AS deposit, a.price_per_area AS price_per_area "
            "ORDER BY a.avg_rent ASC LIMIT 15"
        )
        with self.driver.session() as session:
            result = session.run(cypher, budget=budget, workplace=workplace)
            return [dict(rec) for rec in result]