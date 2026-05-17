package core

type IpinfoDeveloperError struct {
	IsIpinfoDeveloperError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewIpinfoDeveloperError(code string, msg string, ctx *Context) *IpinfoDeveloperError {
	return &IpinfoDeveloperError{
		IsIpinfoDeveloperError: true,
		Sdk:              "IpinfoDeveloper",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *IpinfoDeveloperError) Error() string {
	return e.Msg
}
