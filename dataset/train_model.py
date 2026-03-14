import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

print("Loading dataset...")

df = pd.read_csv("chronotherapy_dataset.csv")

X = df.drop("Best_Time",axis=1)
y = df["Best_Time"]

X_train,X_test,y_train,y_test = train_test_split(
    X,y,test_size=0.2,random_state=42
)

print("Training Chronotherapy AI...")

model = RandomForestClassifier(
    n_estimators=200,
    max_depth=15,
    random_state=42
)

model.fit(X_train,y_train)

score = model.score(X_test,y_test)

print("Accuracy:",score)

pickle.dump(model,open("model/chronomed_model.pkl","wb"))

print("Model saved.")