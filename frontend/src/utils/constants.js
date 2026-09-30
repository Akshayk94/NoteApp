
export const CATEGORIES=["General", "Learning", "Work", "Personal", "Ideas"];

export const COLORS=[
    {value:"light", label:"Light"},
    {value:"primary", label:"Blue"},
    {value:"success", label:"Green"},
    {value:"warning", label:"Orange"},
    {value:"danger", label:"Red"}
];

export const formatDate=(dateString, withTime=false)=>
    new Date(dateString).toLocaleDateString("end-IN",{
        day:"numeric",
        month:"short",
        year:"numeric",
        ...(withTime && {hour:"2-digit",minute:"2-digit"})
});