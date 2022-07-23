Let say that we have a component that on one iteration renders 5 components and the next inserts a new component in the middle of the list. This would be really hard with just this information to know how to do the mapping between the two lists of components.

By default, React associates the first component of the previous list with the first component of the next list, etc. You can provide a key attribute in order to help React figure out the mapping. In practice, this is usually easy to find out a unique key among the children.

[https://calendar.perfplanet.com/2013/diff/]
