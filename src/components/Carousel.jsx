import { IconTrash, IconLayoutDashboard, IconCalendar, IconChecklist, IconUsers, IconChartBar } from "@tabler/icons-react";
import {motion, transform} from "framer-motion";

const cards = [
                {icon: <IconLayoutDashboard size={40} color="black" />, label: "Dashboard"},
                {icon: <IconCalendar size={40} color="black" />, label: "Calendar"},
                {icon: <IconChecklist size={40} color="black" />, label: "To Do"},
                {icon: <IconUsers size={40} color="black" />, label: "Team"},
                {icon: <IconChartBar size={40} color="black" />, label: "Analytics"}
];

const n = cards.length;
const tz = Math.round(130/(Math.tan(Math.PI/n)));

const cardsVariant = {initial: {},
                      animate: {rotateY: 360, transition: {duration: 18, ease: "linear", repeat: Infinity}}};

const cardsStyle = {transformStyle: "preserve-3d", position: "relative", width: 200, height: 240}

function Carousel() {
    return(
    <motion.div variants = {cardsVariant} initial="initial" animate="animate" style={cardsStyle}>
        {cards.map((card, i) => (
            <div key= {i} style={{width: 200, height: 240, display: "flex", flexDirection: "column", position: "absolute",
                   alignItems: "center", justifyContent: "center", borderRadius: 16, backgroundColor: "powderblue", border: "2px solid white",
                   transform: `rotateY(${(360 / n) * i}deg) translateZ(${tz}px)`,
                   fontSize: 15, fontWeight: 500, gap: 20}}>
                <span>{card.icon}</span>
                <span style={{color: "black", fontSize: 30}}>{card.label}</span>
            </div>
        ))}
    </motion.div>       
    );
} export default Carousel;