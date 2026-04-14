# Print Layout

`Worksheet.jsx` includes a `<style>` block with `@media print` rules that:

- Hide UI controls
- Set cell sizes in centimeters for accurate physical output

**Warning:** Changes to `index.css` flex/grid rules can break the physical paper layout. Keep print-layout correctness in mind whenever editing worksheet or cell styles.
