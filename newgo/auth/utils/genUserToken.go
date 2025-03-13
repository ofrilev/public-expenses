package utils

// import (
// 	"auth/dbModels"
// 	"time"
// 	"aidanwoods.dev/go-paseto"
// )

// type CustomClaims struct {
// 	Email string `json:"email"`
// }

// func updatePublicKey(user dbModels.User) (bool, error) {
// 	tx := gormdbmodule.DB.Model(&user).Where("userid=?", user.Userid).Update("publickey", user.PublicKey)
// 	// DB.Where("userid=?",user.Userid).Update("publickey",user.PublicKey)
// 	n := tx.RowsAffected
// 	if n < 1 {
// 		return false, tx.Error
// 	} else {
// 		return true, nil

// 	}
// }

// func GenUserToken(user dbModels.User) (string, error) {
// 	claims := CustomClaims{
// 		Email: user.Email,
// 		// set other claims
// 	}
// 	jsonToken := paseto.NewToken()
// 	jsonToken.SetIssuedAt(time.Now())
// 	jsonToken.SetExpiration(time.Now().Add(2 * time.Hour))
// 	jsonToken.SetSubject("auth")
// 	jsonToken.Set("data", claims)

// 	secretKey := paseto.NewV4AsymmetricSecretKey() // don't share this!!!

// 	//todo return this to the user
// 	publicKey := secretKey.Public() // DO share this one
// 	user.PublicKey = publicKey.ExportHex()
// 	b, err := updatePublicKey(user)
// 	if b == true {
// 		signed := jsonToken.V4Sign(secretKey, nil)
// 		return signed, nil
// 	} else {
// 		return "", err
// 	}

// }
