# graph_setup.py
import pandas as pd
from neo4j import GraphDatabase
import os
from dotenv import load_dotenv

load_dotenv()

URI = os.getenv('NEO4J_URL')
USER = os.getenv('NEO4J_USER')
PASSWORD = os.getenv('NEO4J_PW')

def get_driver(uri: str, user: str, pwd: str):
    # 기본 암호화 옵션은 드라이버 설정에 따름
    return GraphDatabase.driver(uri, auth=(user, pwd))

driver = get_driver(URI, USER, PASSWORD)

# CSV 파일 경로 (동 단위 지역 정보 포함)
csv_path = './data/HomeGenie_fixed_with_avg_price.csv'

# --- CSV 로딩 ---
def load_regions_from_csv(path: str) -> list[dict]:
    df = pd.read_csv(path)

    df['address'] = df['시군구'].str.cat(df['도로명주소'], sep=' ')

    # 컬럼명 조정: 도로명주소를 동으로, 월세·전세·평당가격 컬럼 리네임
    df = df.rename(columns={
        '동_평균월세': 'avg_rent',
        '동_평균전세': 'avg_deposit',
        '평당가격': 'price_per_area'
    })
    # 필요한 컬럼만 선택 및 결측치 제거
    df = df[['address', 'avg_rent', 'avg_deposit', 'price_per_area']].dropna(subset=['address'])
    # numeric 변환
    df['avg_rent'] = pd.to_numeric(df['avg_rent'], errors='coerce')
    df['avg_deposit'] = pd.to_numeric(df['avg_deposit'], errors='coerce')
    df['price_per_area'] = pd.to_numeric(df['price_per_area'], errors='coerce')

    df.drop_duplicates(subset=['address'], inplace=True, ignore_index=True)
    return df.to_dict(orient='records')

# --- 트랜잭션 함수 ---
def create_region_nodes(tx, regions: list[dict]) -> None:
    query = (
        """
        UNWIND $regions AS r
        MERGE (n:Region {address: r.address})
        SET n.avg_rent = r.avg_rent,
            n.avg_deposit = r.avg_deposit,
            n.price_per_area = r.price_per_area
        """
    )
    tx.run(query, regions=regions)

def main():
    regions = load_regions_from_csv(csv_path)
    with driver.session() as session:
        session.execute_write(create_region_nodes, regions)

    driver.close()

if __name__ == '__main__':
    main()