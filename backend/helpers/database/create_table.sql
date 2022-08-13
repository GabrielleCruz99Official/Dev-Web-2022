CREATE TABLE User (
    UserID int NOT NULL AUTO_INCREMENT,
    UserName varchar(60),
    UserEmail varchar(60),
    UserPassword varchar(60),
    AddressID int,
    SubscriptionID int,
    PRIMARY KEY (UserID),
    FOREIGN KEY (AddressID) references Address(AddressID),
    FOREIGN KEY (SubscriptionID) references Subscription(SubscriptionID)
);

CREATE TABLE Products (
    ProductID int NOT NULL AUTO_INCREMENT,
    ProductName varchar(60),
    ProductDesc text,
    ProductPrice decimal(6,2),
    PRIMARY KEY (ProductID)
);

CREATE TABLE Address (
    AddressID int NOT NULL AUTO_INCREMENT,
    Street varchar(100),
    Postcode int,
    City varchar(30),
    PRIMARY KEY (AddressID)
);

CREATE TABLE Orders (
    OrderID int NOT NULL AUTO_INCREMENT,
    UserID int,
    Subtotal float,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Basket (
    ItemNo int NOT NULL AUTO_INCREMENT,
    BasketID int,
    ProductID int,
    PRIMARY KEY (ItemNo),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE Subscription(
    SubscriptionID int NOT NULL AUTO_INCREMENT,
    ProductID int,
    SubscriptionStart date,
    SubscriptionEnd date,
    PRIMARY KEY (SubscriptionID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE AdminUser (
    AdminUserID int NOT NULL AUTO_INCREMENT,
    AdminUserName varchar(60),
    AdminUserEmail varchar(60),
    AdminUserPassword varchar(60),
    AdminAcces boolean,
    PRIMARY KEY (AdminUserID)  
);