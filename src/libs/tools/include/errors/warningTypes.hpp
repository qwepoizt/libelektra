
#ifndef ELEKTRA_WARNINGTYPES_HPP
#define ELEKTRA_WARNINGTYPES_HPP

#include "warning.hpp"

namespace kdb
{
namespace tools
{
namespace errors
{

/* This file contains all concrete classes for the different Warnings, based on the constants defined in /src/include/kdberrors.h */

class ResourceWarning : public Warning
{
public:
	using Warning::Warning;

	std::string code () const override;
	std::string description () const override;
	ResourceWarning * clone () const override;

private:
	bool compare (const BaseNotification & other) const final;
};

class OutOfMemoryWarning : public Warning
{
public:
	using Warning::Warning;

	std::string code () const override;
	std::string description () const override;
	OutOfMemoryWarning * clone () const override;

private:
	bool compare (const BaseNotification & other) const final;
};

class InstallationWarning : public Warning
{
public:
	using Warning::Warning;

	std::string code () const override;
	std::string description () const override;
	InstallationWarning * clone () const override;

private:
	bool compare (const BaseNotification & other) const final;
};

class InternalWarning : public Warning
{
public:
	using Warning::Warning;

	std::string code () const override;
	std::string description () const override;
	InternalWarning * clone () const override;

private:
	bool compare (const BaseNotification & other) const final;
};

class InterfaceWarning : public Warning
{
public:
	using Warning::Warning;

	std::string code () const override;
	std::string description () const override;
	InterfaceWarning * clone () const override;

private:
	bool compare (const BaseNotification & other) const final;
};

class PluginMisbehaviorWarning : public Warning
{
public:
	using Warning::Warning;

	std::string code () const override;
	std::string description () const override;
	PluginMisbehaviorWarning * clone () const override;

private:
	bool compare (const BaseNotification & other) const final;
};

class ConflictingStateWarning : public Warning
{
public:
	using Warning::Warning;

	std::string code () const override;
	std::string description () const override;
	ConflictingStateWarning * clone () const override;

private:
	bool compare (const BaseNotification & other) const final;
};

class ValidationSyntacticWarning : public Warning
{
public:
	using Warning::Warning;

	std::string code () const override;
	std::string description () const override;
	ValidationSyntacticWarning * clone () const override;

private:
	bool compare (const BaseNotification & other) const final;
};

class ValidationSemanticWarning : public Warning
{
public:
	using Warning::Warning;

	std::string code () const override;
	std::string description () const override;
	ValidationSemanticWarning * clone () const override;

private:
	bool compare (const BaseNotification & other) const final;
};

} // namespace errors
} // namespace tools
} // namespace kdb

#endif // ELEKTRA_WARNINGTYPES_HPP
