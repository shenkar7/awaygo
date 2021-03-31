// -------------COSTUMERS------------------

export const costumers = [
    {
        id: 1,
        phone_number: "0545287543",
        first_name: "שמרית",
        last_name: "ויקטור",
        email: "shimritabc@gmail.com",
        address: {
            city: "עין עצמון",
            street: "המתפלאים",
            number: 32,
            zip_code: "23523",
            floor: null,
            apartment: null
        }
    },
    {
        id: 2,
        phone_number: "0545278954",
        first_name: "יונה",
        last_name: "מנחם",
        email: "jhonymenahem@gmail.com",
        address: {
            city: "ירושלים",
            street: "תלמים",
            number: 3,
            zip_code: "83421",
            floor: 3,
            apartment: 7
        }
    },
    {
        id: 3,
        phone_number: "0548123543",
        first_name: "ג'ובאני",
        last_name: "קוסטלו",
        email: "kostalo@gmail.com",
        address: {
            city: "רעננה",
            street: "פטל",
            number: 11,
            zip_code: "876159",
            floor: 2,
            apartment: 3
        }
    },
    {
        id: 4,
        phone_number: "0547643218",
        first_name: "שמעון",
        last_name: "סוויסה",
        email: "shimonswissa@gmail.com",
        address: {
            city: "שדרות",
            street: "ברוך",
            number: 3,
            zip_code: "372889",
            floor: 1,
            apartment: 2
        }
    }
];

// -------------DISHES------------------

export const dishes = [
    {
        id: 1,
        name: "המבורגר ניצנים",
        description: "נתח 200 גרם אנטרקוט מבקר הגדל בחוף ניצנים",
        prics: 49,
        category: "בורגרים"
    },
    {
        id: 2,
        name: "המבורגר לך מפה",
        description: "מנת הבית - נתח 200 גרם אנטרקוט מבקר הישר מגן יאשיה",
        prics: 57,
        category: "בורגרים"
    },
    {
        id: 3,
        name: "גלידת קלמנטינה",
        description: "גלידת וניל מלאה בקרם איטלקי ופלחי קלמנטינות",
        prics: 17,
        category: "קינוחים"
    },
    {
        id: 4,
        name: "דייסת חרובים",
        description: "דייסת שיבולת שועל מלאה ברקם חרובים חלבי",
        prics: 29,
        category: "קינוחים"
    }
];

// -------------ORDERS------------------

export const orders = [
    {
        id: 1,
        date_time: "22/03/21",
        status: "sent",
        address: {
            city: "עין עצמון",
            street: "המתפלאים",
            number: 32,
            zip_code: "23523",
            floor: null,
            apartment: null
        },
        remark: "",
        costumer: 
        {
            id: 1,
            phone_number: "0545287543",
            first_name: "שמרית",
            last_name: "ויקטור",
            email: "shimritabc@gmail.com",
            address: {
                city: "עין עצמון",
                street: "המתפלאים",
                number: 32,
                zip_code: "23523",
                floor: null,
                apartment: null
            }
        },
        dishes: [
            {
                dish: {
                    id: 1,
                    name: "המבורגר ניצנים",
                    description: "נתח 200 גרם אנטרקוט מבקר הגדל בחוף ניצנים",
                    prics: 49,
                    category: "בורגרים"
                },
                quantity: 2},
            {
                dish: {
                    id: 2,
                    name: "המבורגר לך מפה",
                    description: "מנת הבית - נתח 200 גרם אנטרקוט מבקר הישר מגן יאשיה",
                    prics: 57,
                    category: "בורגרים"
                },
                quantity: 1
            },
            {
                dish: {
                    id: 3,
                    name: "גלידת קלמנטינה",
                    description: "גלידת וניל מלאה בקרם איטלקי ופלחי קלמנטינות",
                    prics: 17,
                    category: "קינוחים"
                },
                quantity: 1
            }
        ]
    },
    {
        id: 2,
        date_time: "22/03/21",
        status: "process",
        address: {
            city: "ירושלים",
            street: "תלמים",
            number: 3,
            zip_code: "83421",
            floor: 3,
            apartment: 7
        },
        remark: "כל הירקות בצד",
        costumer: {
            id: 2,
            phone_number: "0545278954",
            first_name: "יונה",
            last_name: "מנחם",
            email: "jhonymenahem@gmail.com",
            address: {
                city: "ירושלים",
                street: "תלמים",
                number: 3,
                zip_code: "83421",
                floor: 3,
                apartment: 7
            }
        },
        dishes: [
            {
                dish: {
                    id: 1,
                    name: "המבורגר ניצנים",
                    description: "נתח 200 גרם אנטרקוט מבקר הגדל בחוף ניצנים",
                    prics: 49,
                    category: "בורגרים"
                },
                quantity: 4
            },
            {
                dish: {
                    id: 3,
                    name: "גלידת קלמנטינה",
                    description: "גלידת וניל מלאה בקרם איטלקי ופלחי קלמנטינות",
                    prics: 17,
                    category: "קינוחים"
                },
                quantity: 2
            },
            {
                dish: {
                    id: 4,
                    name: "דייסת חרובים",
                    description: "דייסת שיבולת שועל מלאה ברקם חרובים חלבי",
                    prics: 29,
                    category: "קינוחים"
                },
                quantity: 2
            }
        ]
    },
    {
        id: 3,
        date_time: "22/03/21",
        status: "sent",
        address: {
            city: "רעננה",
            street: "פטל",
            number: 11,
            zip_code: "876159",
            floor: 2,
            apartment: 3
        },
        remark: "לא לדפוק על הדלת",
        costumer: 
        {
            id: 3,
            phone_number: "0548123543",
            first_name: "ג'ובאני",
            last_name: "קוסטלו",
            email: "kostalo@gmail.com",
            address: {
                city: "רעננה",
                street: "פטל",
                number: 11,
                zip_code: "876159",
                floor: 2,
                apartment: 3
            }
        },
        dishes: [
            {
                dish: {
                    id: 1,
                    name: "המבורגר ניצנים",
                    description: "נתח 200 גרם אנטרקוט מבקר הגדל בחוף ניצנים",
                    prics: 49,
                    category: "בורגרים"
                },
                quantity: 2},
            {
                dish: {
                    id: 2,
                    name: "המבורגר לך מפה",
                    description: "מנת הבית - נתח 200 גרם אנטרקוט מבקר הישר מגן יאשיה",
                    prics: 57,
                    category: "בורגרים"
                },
                quantity: 1
            },
            {
                dish: {
                    id: 3,
                    name: "גלידת קלמנטינה",
                    description: "גלידת וניל מלאה בקרם איטלקי ופלחי קלמנטינות",
                    prics: 17,
                    category: "קינוחים"
                },
                quantity: 1
            }
        ]
    },
    {
        id: 4,
        date_time: "22/03/21",
        status: "process",
        address: {
            city: "רעננה",
            street: "פטל",
            number: 11,
            zip_code: "876159",
            floor: 2,
            apartment: 3
        },
        remark: "",
        costumer: 
        {
            id: 4,
            phone_number: "0547643218",
            first_name: "שמעון",
            last_name: "סוויסה",
            email: "shimonswissa@gmail.com",
            address: {
                city: "שדרות",
                street: "ברוך",
                number: 3,
                zip_code: "372889",
                floor: 1,
                apartment: 2
            }
        },
        dishes: [
            {
                dish: {
                    id: 1,
                    name: "המבורגר ניצנים",
                    description: "נתח 200 גרם אנטרקוט מבקר הגדל בחוף ניצנים",
                    prics: 49,
                    category: "בורגרים"
                },
                quantity: 2},
            {
                dish: {
                    id: 2,
                    name: "המבורגר לך מפה",
                    description: "מנת הבית - נתח 200 גרם אנטרקוט מבקר הישר מגן יאשיה",
                    prics: 57,
                    category: "בורגרים"
                },
                quantity: 1
            },
            {
                dish: {
                    id: 3,
                    name: "גלידת קלמנטינה",
                    description: "גלידת וניל מלאה בקרם איטלקי ופלחי קלמנטינות",
                    prics: 17,
                    category: "קינוחים"
                },
                quantity: 1
            }
        ]
    }
];