import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from preprocess import load_data

print("Loading data...")

data = load_data()

print("Dataset shape:", data.shape)


X = data[[
"Age",
"Sleep Duration",
"Heart Rate",
"Stress Level",
"blood_glucose_level",
"Cholesterol",
"Gender",
"Condition",
"Drug_Name",
"Dosage_mg",
"Treatment_Duration_days"
]]

y = data["Improvement_Score"]


print("Splitting dataset...")

X_train,X_test,y_train,y_test = train_test_split(
X,y,test_size=0.2,random_state=42
)


print("Training AI model...")

model = RandomForestRegressor(
n_estimators=120,
max_depth=12,
random_state=42
)

model.fit(X_train,y_train)


score = model.score(X_test,y_test)

print("Model Accuracy:",score)


print("Saving model...")

pickle.dump(model,open("model/chronomed_model.pkl","wb"))

print("Model saved successfully")